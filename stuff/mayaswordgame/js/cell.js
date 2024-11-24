const allLetters = "EEEEEEEEEEEEIIIIIIIIIAAAAAAAAAOOOOOOOOTTTTTTRRRRRRNNNNNNUUUUSSSSLLLLDDDDGGGPPMMCCBBFFHHVVWWYYKJXQZ"

class Cell {
	constructor(i_, j_) {
		this.i = i_;
  	this.j = j_;
		this.x = this.i*SCL;
		this.y = this.j*SCL;
		this.letter = allLetters.charAt(floor(random(0, allLetters.length)));
		this.selected = false;
	}

	show() {
		stroke(255);
		noFill();
		if (this.selected) {
			fill(0,0,128);
		}
		rect(this.x, this.y, SCL, SCL);

		fill(255);
		textSize(12);
		textAlign(CENTER, CENTER);
		text(this.letter, this.x + SCL/2, this.y + SCL/2);
	}

	clicked() {
		this.selected = !this.selected;
		word += this.letter;
	}

	neighbors() {
		let neighbors = [];
		for (let ii = this.i-1; ii <= this.i+1; ii++) {
			if (ii >= 0 && ii < COLS) {
				for (let jj = this.j-1; jj <= this.j+1; jj++) {
					if (jj >= 0 && jj < ROWS) {
						neighbors.push(ii + "," + jj);
					}
				}
			}
		}
		return neighbors;
	}
}