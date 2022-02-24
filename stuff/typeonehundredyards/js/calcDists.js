let keyDisplacement = 0.75; // dist between keys in inches
let letters = [
  // keyboard as an 2d array
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
  [" "]
];

let row1to2change = 1 / 4; // displacement on alignment between rows
let row2to3change = 1 / 2;
let row3to4change = 3 / 2;
let spaceDisplacement = 8 / 3;

function calcDistances(letters) {
  let letterDistances = {};
  for (let r = 0; r < letters.length; r++) {
    for (let c = 0; c < letters[r].length; c++) {
      let letter = letters[r][c]; // for each letter...
      for (let nr = 0; nr < letters.length; nr++) {
        // loop through each letter
        for (let nc = 0; nc < letters[nr].length; nc++) {
          let nextLetter = letters[nr][nc];
          let vertDifference = Math.abs(r - nr) * keyDisplacement; //  vert dist = diff in rows * keydisp

          let horizDifference = -1; // initialization
          if (nr == r) {
            // if in same row, horizDiff is their cikumn differece * keydisp
            horizDifference = Math.abs(nc - c);
          }
          // if r diff == 3
          if (Math.abs(nr - r) == 3) {
            //   if r == 0 and nr == 2
            if (r == 0 && nr == 3) {
              //     horiz = abs(nc - c + row1-2 + row2-3)
              horizDifference = Math.abs(
                nc -
                  c +
                  row1to2change +
                  row2to3change +
                  row3to4change +
                  spaceDisplacement
              );
            }
            //   if r == 2 and nr == 0
            if (r == 3 && nr == 0) {
              //     horiz = abs(c - nc + row1-2 + row2-3)
              horizDifference = Math.abs(
                c -
                  nc +
                  row1to2change +
                  row2to3change +
                  row3to4change +
                  spaceDisplacement
              );
            }
          }
          // if r diff == 1
          if (Math.abs(nr - r) == 1) {
            //   if r sum = 1
            if (r + nr == 1) {
              //     if r == 0 and nr == 1
              if (r == 0 && nr == 1) {
                //       horiz = abs(nc - c + row1-2)
                horizDifference = Math.abs(nc - c + row1to2change);
              }
              //     if r == 1 and nr == 0
              if (r == 1 && nr == 0) {
                //       horiz = abs(c - nc + row1-2)
                horizDifference = Math.abs(c - nc + row1to2change);
              }
            }
            //   if r sum = 3
            if (r + nr == 3) {
              //     if r == 1 and nr == 2
              if (r == 1 && nr == 2) {
                //       horiz = abs(nc - c + row2-3)
                horizDifference = Math.abs(nc - c + row2to3change);
              }
              //     if r == 2 and nr == 1
              if (r == 2 && nr == 1) {
                //       horiz = abs(c - nc + row2-3)
                horizDifference = Math.abs(c - nc + row2to3change);
              }
            }
            if (r + nr == 5) {
              //     if r == 1 and nr == 2
              if (r == 2 && nr == 3) {
                //       horiz = abs(nc - c + row2-3)
                horizDifference = Math.abs(
                  nc - c + row3to4change + spaceDisplacement
                );
              }
              //     if r == 2 and nr == 1
              if (r == 3 && nr == 2) {
                //       horiz = abs(c - nc + row2-3)
                horizDifference = Math.abs(
                  c - nc + row3to4change + spaceDisplacement
                );
              }
            }
          }
          if (Math.abs(nr - r) == 2) {
            //   if r sum = 1
            if (r + nr == 2) {
              //     if r == 0 and nr == 1
              if (r == 0 && nr == 2) {
                //       horiz = abs(nc - c + row1-2)
                horizDifference = Math.abs(
                  nc - c + row1to2change + row2to3change
                );
              }
              //     if r == 1 and nr == 0
              if (r == 2 && nr == 0) {
                //       horiz = abs(c - nc + row1-2)
                horizDifference = Math.abs(
                  c - nc + row1to2change + row2to3change
                );
              }
            }
            if (r + nr == 4) {
              //     if r == 0 and nr == 1
              if (r == 1 && nr == 3) {
                //       horiz = abs(nc - c + row1-2)
                horizDifference = Math.abs(
                  nc - c + row2to3change + row3to4change + spaceDisplacement
                );
              }
              //     if r == 1 and nr == 0
              if (r == 3 && nr == 1) {
                //       horiz = abs(c - nc + row1-2)
                horizDifference = Math.abs(
                  c - nc + row2to3change + row3to4change + spaceDisplacement
                );
              }
            }
          }

          horizDifference *= keyDisplacement;
          dist = Math.sqrt(
            Math.pow(horizDifference, 2) + Math.pow(vertDifference, 2)
          );

          index = letter + nextLetter;
          letterDistances[index] = dist;
        }
      }
    }
  }
  return letterDistances;
}
