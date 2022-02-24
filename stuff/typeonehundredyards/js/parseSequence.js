function parseSequence(str) {
  // finds travel length for given string
  letterArr = str.split("");
  console.log(letterArr);

  strDistance = 0;
  for (let i = 1; i < letterArr.length; i++) {
    let token = letterArr[i - 1] + letterArr[i];
    let dist = distances[token];
    strDistance += dist;
    console.log(token, dist, strDistance);
  }

  console.log(strDistance);
}
