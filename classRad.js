
class Rad {
    constructor(index) {
  
      for(let i = 0; i < points.length; i ++) {
        this.x = points[index].x
        this.y = points[index].y
      }
  
      this.shape = chooseShape();
      this.size = random(40, 80);
      this.rot = random(TWO_PI);
  
      this.dragging = false;
      this.baseRotVal = random(-0.05, 0.05);
      this.rotVal = this.baseRotVal;
    }
  
    show() {
      push();
      translate(this.x, this.y);
      rotate(this.rot);
      drawShape(this.shape, this.size);
      pop();
    }
  
  
    move() {
      this.rot += this.rotVal;
    }
  
    moveUp() {
      this.rotVal = this.baseRotVal * 4;
    }
  
    moveDown() {
      this.rotVal = this.baseRotVal;
    }
  
    grab() {
      let d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.size / 2) {
        this.dragging = true;
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
      }
    }
  
    release() {
      this.dragging = false;
    }
  
    followMouse() {
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }
    getPoint() {
      // punkt auf Kreisumfang
      let p = {
        x: this.x + cos(this.rot) * this.size/2, 
        y: this.y + sin(this.rot) * this.size/2, 

      }
      return p
    }
  }  