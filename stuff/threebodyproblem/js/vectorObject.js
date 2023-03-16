class VectorObject {
  constructor(mag, ang, dir) {
    this.m = mag;
    this.a = ang;
    this.dir = dir;
  }

  getX() {
    let x = this.m * Math.cos(radians(this.a));
    if (this.dir.includes("W")) x = -1 * x;
    return x;
  }

  getY() {
    let y = this.m * Math.sin(radians(this.a));
    if (this.dir.includes("S")) y = -1 * y;
    return y;
  }
}
