class Bar{
  constructor(value, pos, state = 0){
    this.value = value;
    this.curr_pos = createVector(pos[0], pos[1]);
    this.actual_pos = createVector(pos[0], pos[1]);
    this.state = 0;
    this.move_lerp = 0.08;
  }
  
  update(){
    this.curr_pos.add(p5.Vector.sub(this.actual_pos, this.curr_pos).mult(this.move_lerp));
  }
  
  draw(){
    rectMode(CORNER);
    stroke(255);
    strokeWeight(3);
    fill(states_colors[this.state][0], states_colors[this.state][1], states_colors[this.state][2]);
    rect(this.curr_pos.x, this.curr_pos.y, bars_width, this.value);
  }
  
  swap(other){
    [this.actual_pos, other.actual_pos] = [other.actual_pos, this.actual_pos];
  }
}