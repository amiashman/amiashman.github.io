class Cell {
  constructor(r, c, w) {
    this.r = r;
    this.c = c;
    this.w = w;
    this.x = (this.c - 2) * this.w + this.w / 2;
    this.y = (this.r - 2) * this.w + this.w / 2;
    this.number = this.r * 4 + this.c + 1;
    this.intended = {
      r: r,
      c: c
    };
  }

  show() {
    stroke(149, 165, 166);
    strokeWeight(4);
    fill(wrongColor);
    if (this.r == this.intended.r && this.c == this.intended.c) {
      fill(rightColor);
    }
    if (this.intended.r == 3 && this.intended.c == 3) {
      fill(149, 165, 166);
    }
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w, 20);
    textAlign(CENTER, CENTER);
    textSize(32);
    stroke(255);
    strokeWeight(2);
    fill(255);
    text(this.number, this.x, this.y);
    if (this.intended.r == 3 && this.intended.c == 3) {
      stroke(149, 165, 166);
      fill(149, 165, 166);
      rect(this.x, this.y, this.w, this.w, 20);
    }
  }

  update(rnew, cnew) {
    this.r = rnew;
    this.c = cnew;
    this.x = (this.c - 2) * this.w + this.w / 2;
    this.y = (this.r - 2) * this.w + this.w / 2;
  }
}
