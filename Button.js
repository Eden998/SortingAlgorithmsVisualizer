class Button{
  constructor(x, y, text, text_size, font, color = [0, 0, 0]){
    this.pos = [x, y];
    this.color = color;
    this.text = text;
    this.text_size = text_size;
    this.font = font;
    this.text_rect = this.font.textBounds(this.text, this.pos[0], this.pos[1], this.text_size);
    this.boundary = 20;
    this.text_rect.h = 19; //OVERRIDING
    this.text_rect_mid_x = this.text_rect.x + this.text_rect.w / 2;
    this.text_rect_mid_y = this.text_rect.y + this.text_rect.h / 2;
    this.text_width_from_mid = this.text_rect.w / 2 + this.boundary / 2;
    this.text_height_from_mid = this.text_rect.h / 2 + this.boundary / 2;
    this.mouse_hover = false;
    this.rect_curve = 10;
  }
  
  draw(){
    this.update_hover();
    stroke(this.color)
    strokeWeight(3)
    rectMode(CENTER);
    textSize(this.text_size)
    if (this.mouse_hover){
      fill(this.color)
      rect(this.text_rect.x + this.text_rect.w / 2, this.text_rect.y + this.text_rect.h / 2, this.text_rect.w + this.boundary, this.text_rect.h + this.boundary, this.rect_curve);
      strokeWeight(0)
      fill(255)
      text(this.text, this.pos[0], this.pos[1]);
    }
    else{
      fill(255)
      rect(this.text_rect.x + this.text_rect.w / 2, this.text_rect.y + this.text_rect.h / 2, this.text_rect.w + this.boundary, this.text_rect.h + this.boundary, this.rect_curve);
      strokeWeight(0)
      fill(this.color)
      text(this.text, this.pos[0], this.pos[1]);
    }
  }
  
  update_hover(){
    if(this.text_rect_mid_x - this.text_width_from_mid <= mouseX && mouseX <= this.text_rect_mid_x + this.text_width_from_mid && this.text_rect_mid_y - this.text_height_from_mid <= mouseY && mouseY <= this.text_rect_mid_y + this.text_height_from_mid){
      this.mouse_hover = true;
    }
    else{
      this.mouse_hover = false;
    }
  }
  
  is_clicked(){
    if(this.text_rect_mid_x - this.text_width_from_mid <= mouseX && mouseX <= this.text_rect_mid_x + this.text_width_from_mid && this.text_rect_mid_y - this.text_height_from_mid <= mouseY && mouseY <= this.text_rect_mid_y + this.text_height_from_mid){
      return true;
    }
    return false;
  }
}