let bars_length;
let bars = [];
let bars_states = [];
let states_colors = [[135, 206, 250], [144,238,144], [220,20,60], [255,215,0]];
let bars_range = [10, 400];
let bars_height = 100;
let bars_width = 20;
let screen_size = [900, 700];
let sleep_time = 100;
let sorting = false;

//  size slider
let size_slider;
let size_slider_pos = [screen_size[0] / 2, screen_size[1] - 150];
let size_slider_length = 200;
let min_bars_length= 5;
let max_bars_length= 30;
let size_slider_radius = 20;


// Sliders
let sliders_text_size = 20;

//   speed slider
let speed_slider;
let speed_slider_pos = [screen_size[0] / 2, screen_size[1] - 50];
let speed_slider_length = 200;
let min_wait= 500;
let max_wait= 10;
let speed_slider_radius = 20;

//  Buttons
let buttons_font;

// *** quicksort button ***
let quicksort_button;
let quicksort_button_pos = [screen_size[0] / 2 - 180, 60];
let quicksort_button_text_size = 25;
let quicksort_button_text_color = [34,139,34];

// *** insertion sort button ***
let insertionsort_button;
let insertionsort_button_pos = [screen_size[0] / 2 - 4 , 60 - 1];
let insertionsort_button_text_size = 25;
let insertionsort_button_text_color = [34,139,34];

// *** bubblesort button ***
let bubblesort_button;
let bubblesort_button_pos = [screen_size[0] / 2 + 180, 60];
let bubblesort_button_text_size = 25;
let bubblesort_button_text_color = [34,139,34];


// *** Generate Bars Button ***
let generate_bars_button;
let generate_bars_pos = [screen_size[0] - 100, screen_size[1] - 100];
let generate_bars_text_size = 25;
let generate_bars_text_color = [34,139,34];

function preload(){
  buttons_font = loadFont("assets/OpenSans-Light.ttf");
}

function setup() {
  cnv = createCanvas(screen_size[0], screen_size[1]);
  textAlign(CENTER);
  textFont(buttons_font)
  
  // sliders initialization
  
  size_slider = new Slider(size_slider_pos, size_slider_length, min_bars_length, max_bars_length, size_slider_radius, "Size:", min_bars_length, max_bars_length, true, true);
  bars_length = size_slider.value;
  
  speed_slider = new Slider(speed_slider_pos, speed_slider_length, min_wait, max_wait, speed_slider_radius, "Sorting Speed:", "Slower", "Faster", false);
  generate_bars();
  
  // buttons initialization
  
  quicksort_button = new Button(quicksort_button_pos[0], quicksort_button_pos[1], "Quick Sort", quicksort_button_text_size, buttons_font, quicksort_button_text_color);
  
  insertionsort_button = new Button(insertionsort_button_pos[0], insertionsort_button_pos[1], "Insertion Sort", insertionsort_button_text_size, buttons_font, insertionsort_button_text_color);
  
  bubblesort_button = new Button(bubblesort_button_pos[0], bubblesort_button_pos[1], "Bubble Sort", bubblesort_button_text_size, buttons_font, bubblesort_button_text_color);
  
  generate_bars_button = new Button(generate_bars_pos[0], generate_bars_pos[1], "Generate Bars", generate_bars_text_size, buttons_font, generate_bars_text_color);
}


function centerCanvas(){
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function draw() {
  background(255);
  centerCanvas();
  draw_bars();
  update_bars();
  size_slider.draw();
  size_slider.update();
  speed_slider.draw();
  speed_slider.update();
  quicksort_button.draw();
  insertionsort_button.draw();
  bubblesort_button.draw();
  generate_bars_button.draw();
  check_size_slider_change();
  check_speed_slider_change();
}

function generate_bars() {
  bars = [];
  for (let i = 0; i < bars_length; i++) {
    let new_value = floor(random(bars_range[0], bars_range[1]))
    let new_bar = new Bar(new_value, [screen_size[0] / 2 - (bars_length / 2 - i) * bars_width,bars_height]);
    bars.push(new_bar);
    bars_states.push(0);
  }
}

function mousePressed() {
  if (!sorting){
    if (size_slider.is_clicked()){
      size_slider.clicked = true;
    }
    if (quicksort_button.is_clicked() && !is_sorted())
    {
      active_quicksort()
    }
    if (insertionsort_button.is_clicked() && !is_sorted())
    {
      active_insertionsort();
    }
    if (bubblesort_button.is_clicked() && !is_sorted())
    {
      active_bubblesort();
    }
    if (generate_bars_button.is_clicked()){
      generate_bars();
    }
  }
  if (speed_slider.is_clicked()){
    speed_slider.clicked = true;
  }
}

function mouseReleased(){
  size_slider.clicked = false;
  speed_slider.clicked = false;
}

function draw_bars() {
  for (let i = 0; i < bars_length; i++) {
    if (bars[i].state != 2){
      bars[i].draw();
    }
  }
  for (let i = 0; i < bars_length; i++) {
    if (bars[i].state == 2){
      bars[i].draw();
    }
  }
}

function update_bars() {
  for (let i = 0; i < bars_length; i++) {
    bars[i].update();
  }
}

function check_size_slider_change(){
  if (bars_length != size_slider.value){
    bars_length = size_slider.value;
    generate_bars();
  }
}

function check_speed_slider_change(){
  if (sleep_time != speed_slider.value){
    sleep_time = speed_slider.value;
  }
}

async function active_quicksort(){
  sorting = true;
  await quicksort(0, bars.length - 1);
  sorting = false;
}
async function quicksort(start, end){
  if (start < end){
    let pi = await partition(start, end);
    
    await Promise.all([quicksort(start, pi - 1), quicksort(pi + 1, end)]);
    
  }
}

async function partition(start, end){
  for (let curr = start ; curr <= end ; curr++){
    bars[curr].state = 1;
  }
  
  let pivot = bars[end];
  
  let i = start - 1;

  for (let j = start ; j <= end - 1; j++){
    bars[j].state = 2;
    if (bars[j].value < pivot.value){
      i++;
      swap_bars(i, j)
      await sleep(sleep_time);
      bars[i].state = 1;
    }
    else{
      await sleep(sleep_time);
      bars[j].state = 1;
    }
  }
  swap_bars(i+1, end);
  for (let curr = start ; curr <= end ; curr++){
    bars[curr].state = 0;
  }
  return i+1;
}

async function active_bubblesort(){
  sorting = true;
  await bubblesort();
  sorting = false;
}

async function bubblesort(){
  for (let i = 0 ; i < bars.length ; i++){
    for(let bar_i = 0 ; bar_i < bars.length - i ; bar_i++){
      bars[bar_i].state = 1;
    }
    for (let j = 0 ; j < bars.length - i - 1; j++){
      bars[j].state = 2;
      bars[j+1].state = 2;
      if (bars[j].value > bars[j+1].value){
        swap_bars(j, j+1);
      }
      await sleep(sleep_time);
      bars[j].state = 1;
      bars[j+1].state = 1;
    }
    for(let bar_i = 0 ; bar_i < bars.length - i ; bar_i++){
      bars[bar_i].state = 0;
    }
  }
}

async function active_insertionsort(){
  sorting = true;
  await insertionsort();
  sorting = false;
}

async function insertionsort(){
  for(let i = 1; i < bars_length; i++){
    let curr_key = bars[i].value;
    let j = i - 1;
    
    bars[i].state = 2;
    
    for(let curr = 0 ; curr < i ; curr++){
      bars[curr].state = 1;
    }
    
    await sleep(sleep_time)
    
    while (j >= 0 && curr_key < bars[j].value){
      swap_bars(j, j+1);
      await sleep(sleep_time);
      j--;
    }
    
    for(let curr = 0 ; curr <= i ; curr++){
      bars[curr].state = 0;
    }
  }
}

function is_sorted(){
  for (let i = 0 ; i < bars_length - 1; i++){
    if (bars[i].value > bars[i+1].value){
      return false;
    }
  }
  return true;
}
function swap_bars(i, j){
  [bars[i], bars[j]] = [bars[j], bars[i]];
  bars[i].swap(bars[j]);
}
function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  });
}
