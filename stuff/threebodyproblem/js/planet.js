class Planet {
  constructor(index, m, x, y, vx, vy, r, c) {
    this.index = index;
    this.mass = m;
    this.pos = {
      x: x + width / 2,
      y: y + height / 2
    };
    this.vel = {
      x: vx,
      y: vy
    };
    this.radius = r;
    this.color = c;

    this.planets = [];
  }

  show() {
    stroke(this.color);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }

  addPlanet(p) {
    this.planets.push(p);
  }

  addPlanets(ps) {
    console.log(ps);
    ps.forEach((p) => {
      this.planets.push(p);
    });
  }

  calculateGForce(p) {
    let r = Math.sqrt(
      Math.pow(this.pos.x - p.pos.x, 2) + Math.pow(this.pos.y - p.pos.y, 2)
    );

    if (r < 10) r = 10;
    if (r > 100) r = 100;

    let magnitude = (G * this.mass * p.mass) / Math.pow(r, 2);

    let dx = p.pos.x - this.pos.x;
    let dy = p.pos.y - this.pos.y;

    let dir = "";

    if (dx > 0) {
      if (dy > 0) dir = "NE";
      else dir = "SE";
    } else {
      if (dy > 0) dir = "NW";
      else dir = "SW";
    }

    let angle = degrees(Math.atan(Math.abs(dy / dx)));

    let force = new VectorObject(magnitude, angle, dir);
    return force;
  }

  resultantX(vecs) {
    let finX = 0;

    vecs.forEach((v) => {
      finX += v.getX();
    });

    return finX;
  }

  resultantY(vecs) {
    let finY = 0;

    vecs.forEach((v) => {
      finY += v.getY();
    });

    return finY;
  }

  showNormalizedForce(forces, dist) {
    let resX = 0;
    let resY = 0;

    forces.forEach((force) => {
      let x = 10 * Math.cos(radians(force.a));
      if (force.dir.includes("W")) x = -1 * x;
      resX += x;

      let y = 10 * Math.sin(radians(force.a));
      if (force.dir.includes("S")) y = -1 * y;
      resY += y;
    });

    // resX *= 10;
    // resY *= 10;

    stroke(this.color);
    line(this.pos.x, this.pos.y, this.pos.x + resX, this.pos.y + resY);
  }

  updateVelX(accX) {
    this.vel.x += accX * TIME;
  }

  updateVelY(accY) {
    this.vel.y += accY * TIME;
  }

  updatePosX(resX) {
    let accX = resX / this.mass;
    let dx = this.vel.x * TIME + 0.5 * accX * Math.pow(TIME, 2);

    this.updateVelX(accX);

    return dx;
  }

  updatePosY(resY) {
    let accY = resY / this.mass;
    let dy = this.vel.y * TIME + 0.5 * accY * Math.pow(TIME, 2);

    this.updateVelY(accY);

    return dy;
  }

  update() {
    let forces = [];
    this.planets.forEach((planet) => {
      forces.push(this.calculateGForce(planet));
    });

    // this.showNormalizedForce(forces, 10);

    this.pos.x += this.updatePosX(this.resultantX(forces));
    this.pos.y += this.updatePosY(this.resultantY(forces));
  }
}
