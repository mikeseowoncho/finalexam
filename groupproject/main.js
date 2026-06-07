document.getElementById("time").innerHTML = new Date().toLocaleString();

function pink() {
  document.body.style.backgroundColor = "pink";
}

function lightBlue() {
  document.body.style.backgroundColor = "lightblue";
}

function yellow() {
  document.body.style.backgroundColor = "yellow";
}

function reset() {
  document.body.style.backgroundColor = "linen";
}

function showhtml() {
  document.getElementById("fig").src = "img/html5.png";
  document.getElementById("desc").innerHTML = "HTML5 로고";
}

function showcss() {
  document.getElementById("fig").src = "img/css3.png";
  document.getElementById("desc").innerHTML = "CSS3 로고";
}

function showjs() {
  document.getElementById("fig").src = "img/js.png";
  document.getElementById("desc").innerHTML = "JavaScript 로고";
}

function hide() {
  document.getElementById("fig").src = "img/blank.png";
  document.getElementById("desc").innerHTML = "";
}
