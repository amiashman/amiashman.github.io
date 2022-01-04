cardLayouts = [
  {
    hex: "#e74c3c",
    color: "red",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#3498db",
    color: "blue",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#f1c40f",
    color: "yellow",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#27ae60",
    color: "green",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#8e44ad",
    color: "purple",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#e67e22",
    color: "orange",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#f368e0",
    color: "pink",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#ecf0f1",
    color: "white",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#95a5a6",
    color: "gray",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#01a3a4",
    color: "teal",
    shape: "circle",
    draw: function (x, y) {
      ellipse(x, y, w / 2);
    }
  },
  {
    hex: "#e74c3c",
    color: "red",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#3498db",
    color: "blue",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#f1c40f",
    color: "yellow",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#27ae60",
    color: "green",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#8e44ad",
    color: "purple",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#e67e22",
    color: "orange",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#f368e0",
    color: "pink",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#ecf0f1",
    color: "white",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#95a5a6",
    color: "gray",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#01a3a4",
    color: "teal",
    shape: "square",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w / 2);
    }
  },
  {
    hex: "#e74c3c",
    color: "red",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#3498db",
    color: "blue",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#f1c40f",
    color: "yellow",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#27ae60",
    color: "green",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#8e44ad",
    color: "purple",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#e67e22",
    color: "orange",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#f368e0",
    color: "pink",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#ecf0f1",
    color: "white",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#95a5a6",
    color: "gray",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#01a3a4",
    color: "teal",
    shape: "triangle",
    draw: function (x, y) {
      triangle(
        x - w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x + w / 4,
        y + (Math.sqrt(3) * w) / 8,
        x,
        y - (Math.sqrt(3) * w) / 8
      );
    }
  },
  {
    hex: "#e74c3c",
    color: "red",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#3498db",
    color: "blue",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#f1c40f",
    color: "yellow",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#27ae60",
    color: "green",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#8e44ad",
    color: "purple",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#e67e22",
    color: "orange",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#f368e0",
    color: "pink",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#ecf0f1",
    color: "white",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#95a5a6",
    color: "gray",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#01a3a4",
    color: "teal",
    shape: "rectangle",
    draw: function (x, y) {
      rectMode(CENTER);
      rect(x, y, w / 2, w);
    }
  },
  {
    hex: "#e74c3c",
    color: "red",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#3498db",
    color: "blue",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#f1c40f",
    color: "yellow",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#27ae60",
    color: "green",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#8e44ad",
    color: "purple",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#e67e22",
    color: "orange",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#f368e0",
    color: "pink",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#ecf0f1",
    color: "white",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#95a5a6",
    color: "gray",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  },
  {
    hex: "#01a3a4",
    color: "teal",
    shape: "circles",
    draw: function (x, y) {
      ellipse(x, y - w / 4, w / 2);
      ellipse(x, y + w / 4, w / 2);
    }
  }
];

function scrambleCards() {
  for (let i = cardLayouts.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardLayouts[i], cardLayouts[j]] = [cardLayouts[j], cardLayouts[i]];
  }
}
