function processQueryParameters() {
  const URLQuery = window.location.search;
  urlParams = new URLSearchParams(URLQuery);
  console.log(URLQuery);

  if (urlParams.get("rickroll") == "true") {
    grantAuthorization();
  }

  if (urlParams.get("authorized") == "true") {
    document.getElementById("message").innerHTML =
      "DID YOU REALLY TRY TO CHANGE AUTHORIZED TO TRUE?!? DO YOUR TASK, CHEATER!";
  }

  console.log(urlParams);
}

// also make unreadable
function grantAuthorization() {
  //rickroll
  document.getElementsByTagName("body")[0].innerHTML =
    "<img id='rickroll' style = 'position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);' src='./reward/reward.gif' width='801' height='600'></img>";
}
