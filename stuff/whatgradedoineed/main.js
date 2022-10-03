const btn = document.getElementById("submit");
let result = document.getElementById("result");

function calculate() {
  let grades = document.getElementsByClassName("grade");
  let percents = document.getElementsByClassName("percent");

  let wantedGrade = parseInt(grades[grades.length - 1].value);
  console.log(wantedGrade);

  let totalPercent = 0;

  let totalGrade = 0;
  for (let i = 0; i < grades.length - 1; i++) {
    const g = parseInt(grades[i].value);
    const p = parseInt(percents[i].value);

    totalPercent += p;

    totalGrade += (g * p) / 100;
    console.log(totalGrade);
  }

  totalPercent += parseInt(percents[percents.length - 1].value);

  console.log(totalPercent);

  let neededGrade =
    (wantedGrade - totalGrade) * (100 / percents[percents.length - 1].value);

  neededGrade = neededGrade.toFixed(2);

  result.innerText = createMsg(neededGrade, totalPercent);
}

function createMsg(neededGrade, totalPercent) {
  if (totalPercent != 100) {
    return "You must have a total of 100% of your grade accounted for.";
  } else if (neededGrade > 100) {
    return "Unfortunately, it is impossible to acheive that grade.";
  } else if (neededGrade < 0) {
    return "There is no way not to get that grade!";
  }
}

function highestGrade()

// ensure total of 100%
// make answer half at most 2 decimal digits
// make edge cases for impossiblity AND no matter what
