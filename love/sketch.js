const reunion = 1718006100000;
let now;

function setup() {
  noCanvas();
}

function draw() {
  removeElements();
  background(255);
  now = new Date().getTime();

  let delta = reunion - now;
  let days = floor(delta / 86400000);
  delta = delta - 86400000 * days;
  let hours = floor(delta / 3600000);
  delta = delta - 3600000 * hours;
  let minutes = floor(delta / 60000);
  delta = delta - 60000 * minutes;
  let seconds = floor(delta / 1000);
  delta = delta - 1000 * seconds;

  let p = createP(
    "In " +
      days +
      " days, " +
      hours +
      " hours, " +
      minutes +
      " minutes, " +
      "and " +
      seconds +
      " seconds," +
      "<br>" +
      "We'll see each other from afar in the airport" +
      "<br>" +
      "And we'll run into each other's arms" +
      "<br>" +
      "And hug and kiss and cry and never let go" +
      "<br>" +
      "And begin the most incredible 2 months together." +
      "<br>" +
      "But until then," +
      "<br>" +
      "We have to spend some time apart" +
      "<br>" +
      "And it will difficult, and seem undoable at times" +
      "<br>" +
      "But together, we'll get though it." +
      "<br>" +
      "We'll think of each other all the time" +
      "<br>" +
      "And text and call and remind each other how much we love each other" +
      "<br>" +
      "And remember the 2 amazing months that await us" +
      "<br>" +
      "Months of absolute happiness, and laughter, and love" +
      "<br>" +
      "And whenever we fell lonely" +
      "<br>" +
      "We'll look up at the stars in the sky and remember" +
      "<br>" +
      "That on the other side of the world, our true love is thinking of us" +
      "<br>" +
      "Forever and always"
  );
}
