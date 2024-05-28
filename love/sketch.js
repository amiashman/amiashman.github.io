const reunion = {
  month: 6,
  day: 9,
  hour: 23,
  minute: 55,
  second: 0
};
let now = {};

function setup() {
  noCanvas();
}

function draw() {
  removeElements();
  background(255);
  now = {
    day: day(),
    hour: hour(),
    minute: minute(),
    second: second()
  };

  let remaining = {
    days: (reunion.day - now.day + 31) % 31,
    hours: (reunion.hour - now.hour + 24) % 24,
    minutes: (reunion.minute - now.minute + 60) % 60,
    seconds: (reunion.second - now.second + 60) % 60
  };

  let p = createP(
    "In " +
      remaining.days +
      " days, " +
      remaining.hours +
      " hours, " +
      remaining.minutes +
      " minutes, " +
      "and " +
      remaining.seconds +
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
      "We'll look up and the stars in the sky and remember" +
      "<br>" +
      "And on the other side of the world, our true love is thinking of us" +
      "<br>" +
      "Forever and always"
  );
}
