class Slider{
  constructor(pos, length, min_val, max_val, size_slider_radius, slider_label, left_label, right_label, show_value = true, sorting_block = false){
    
    // Slider Visual:
    this.pos = createVector(pos[0], pos[1]);
    this.length = length;
    this.button_pos = createVector(pos[0], pos[1]);
    this.value_text_offset = 30;
    this.button_radius = size_slider_radius;
    this.clicked = false;
    
    // Visual Parameters:
    this.min_val = min_val;
    this.max_val = max_val;
    this.value = floor((min_val + max_val) / 2)
    this.sorting_block = sorting_block;
    this.sorting_block_color = [220,20,60];
    
    // slider texts
    this.slider_label = slider_label;
    this.slider_label_width = buttons_font.textBounds(str(this.slider_label), this.pos.x, this.pos.y, sliders_text_size).w;
    this.left_label = left_label;
    this.right_label = right_label;
    this.left_label_width = buttons_font.textBounds(str(this.left_label), this.pos.x, this.pos.y, sliders_text_size).w;
    this.right_label_width = buttons_font.textBounds(str(this.right_label), this.pos.x, this.pos.y, sliders_text_size).w;
    this.edge_values_offset = 15;
    this.edge_values_y_fix = 5;
    this.show_value = show_value;
  }
  
  draw(){
    //drwaing slider
    stroke(5);
    strokeWeight(2)
    fill(0, 0, 0);
    line(this.pos.x - this.length / 2, this.pos.y, this.pos.x + this.length / 2, this.pos.y);
    //drawing button
    stroke(2);
    if (this.sorting_block && sorting){
      fill(this.sorting_block_color)
    }
    else{
      fill(135, 206, 250);
    }
    circle(this.button_pos.x, this.button_pos.y, this.button_radius);
    textSize(sliders_text_size);
    strokeWeight(0.8)
    fill(0);
    textAlign(CENTER)

    text(this.slider_label, this.pos.x - this.length / 2 - this.left_label_width - this.edge_values_offset * 2 - this.slider_label_width / 2, this.pos.y + this.edge_values_y_fix)    
    
    strokeWeight(0)
    
    text(this.left_label, this.pos.x - this.length / 2 - this.edge_values_offset - this.left_label_width / 2, this.pos.y + this.edge_values_y_fix)
    text(this.right_label, this.pos.x + this.length / 2 + this.edge_values_offset + this.right_label_width / 2, this.pos.y + this.edge_values_y_fix)
    if (this.show_value){
      text(this.value, this.button_pos.x, this.button_pos.y + this.value_text_offset)
    }
  }
  
  update(){
    if (this.clicked){
      this.button_pos.x = constrain(mouseX, this.pos.x - this.length / 2, this.pos.x + this.length / 2);
      
      this.value = floor(map(this.button_pos.x, this.pos.x - this.length / 2, this.pos.x + this.length / 2, this.min_val, this.max_val));
    }
  }
  
  is_clicked(){
    if (dist(mouseX, mouseY, this.button_pos.x, this.button_pos.y) < this.button_radius){
      return true;
    }
  }
}
