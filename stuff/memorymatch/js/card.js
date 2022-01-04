class Card {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.index = j * cols + i;
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.gap = 7;
    this.x = (this.i - (this.cols - 1) / 2) * this.w;
    this.y = (this.j - (this.rows - 1) / 2) * this.h;
    this.revealed = false;
    this.locked = false;
    this.guessed = false;
  }

  show() {
    if (!this.guessed) {
      stroke(0);
      fill(0);
      rectMode(CENTER);
      rect(this.x, this.y, this.w - this.gap, this.h - this.gap, 3);
      if (this.revealed) {
        stroke(this.data.hex);
        fill(this.data.hex);
        this.data.draw(this.x, this.y);
      }
    }
  }

  assign() {
    let choiceNumber = Math.floor(Math.random() * cards.length);
    this.choice = cards[choiceNumber];
    cards.splice(choiceNumber, 1);
    this.data = cardLayouts[this.choice];
  }

  reveal() {
    if (!this.locked) {
      this.revealed = !this.revealed;
    }
  }
}

function lockGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].locked = !grid[i][j].locked;
    }
  }
}
