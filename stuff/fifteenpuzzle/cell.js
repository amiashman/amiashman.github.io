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
    this.color = wrongColor;
    this.textColor = "#ffffff";
  }

  show() {
    stroke(bgColor);
    strokeWeight(4);
    fill(this.color);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w, 20);

    textAlign(CENTER, CENTER);
    textSize(32);
    stroke(this.textColor);
    strokeWeight(2);
    fill(this.textColor);
    text(this.number, this.x, this.y);
  }

  update(rnew, cnew) {
    this.r = rnew;
    this.c = cnew;
    this.x = (this.c - 2) * this.w + this.w / 2;
    this.y = (this.r - 2) * this.w + this.w / 2;
    this.determineColor();
  }

  determineColor() {
    if (this.r == this.intended.r && this.c == this.intended.c) {
      this.color = rightColor;
    } else if (this.r != this.intended.r || this.c != this.intended.c) {
      this.color = wrongColor;
    }

    if (this.getLuminance(this.color) > 186) {
      this.textColor = "#000000";
    } else {
      this.textColor = "#ffffff";
    }

    if (this.intended.r == 3 && this.intended.c == 3) {
      this.color = bgColor;
      this.textColor = bgColor;
    }
  }

  getLuminance(hexColor) {
    hexColor = hexColor.substring(1);
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);
    let l = r * 0.299 + g * 0.587 + b * 0.114;
    return l;
  }
}
