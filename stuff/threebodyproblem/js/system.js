class System {
  constructor(params, identifier) {
    this.identifier = identifier
    this.planets = [];
    params.forEach((p) => {
      this.planets.push(
        new Planet(
          p.index,
          p.mass,
          p.xPos,
          p.yPos,
          p.xVel,
          p.yVel,
          p.radius,
          p.color
        )
      );
    });

    this.planets.forEach((pParent) => {
      this.planets.forEach((pChild) => {
        if (pParent.index != pChild.index) {
          pParent.addPlanet(pChild);
        }
      });
    });
  }

  show() {
    this.planets.forEach((p) => {
      p.show();
    });
  }

  update() {
    this.planets.forEach((p) => {
      p.update();
    });
  }

  centerOfMass(px, py) {
    let x = 0;
    let y = 0;
    let totalMass = 0;

    this.planets.forEach((p) => {
      x += p.mass * p.pos.x;
      y += p.mass * p.pos.y;
      totalMass += p.mass;
    });

    x /= totalMass;
    y /= totalMass;

    noStroke();
    fill("#ffffff");
    text(
      "Center of Mass of System " + this.identifier + ": " +
        nf(x - width / 2, 3, 2) +
        ", " +
        nf(y - height / 2, 3, 2),
      px,
      py
    );

    ellipse(x, y, 2, 2);
  }
}
