let moves = document.getElementById("moves");
let time = document.getElementById("time");

moves.innerText = 0;

function updateMoves() {
  moves.innerText = moveCounter;
}

let s = -1;
let timeOut;
function showTime() {
  if (!gridLocked && !menuOpen) {
    s++;
  }
  m = (s - (s % 60)) / 60;
  time.innerText = m + ":" + nf(s % 60, 2);

  timeOut = setTimeout(showTime, 1000);
}
