class TextBox {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }

  show(txt) {
    stroke("#f1f2f6");
    fill("#f1f2f6");
    rectMode(CENTER);
    rect(this.x, this.y, (this.w * 7) / 4, this.w / 2, 20);
    stroke("#2f3542");
    strokeWeight(1);
    fill("#2f3542");
    textAlign(CENTER, CENTER);
    textSize(24);
    text(txt, this.x, this.y);
  }
}
