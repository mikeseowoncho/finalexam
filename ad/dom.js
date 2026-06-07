//const element = document.getElementById("intro");
//const element1 = document.getElementsByTagName("h1");
//const x = document.getElementsByClassName("intro");

//document.getElementById("demo").innerHTML = "복사한 내용: " + element.innerHTML;
//document.getElementById("demo1").innerHTML =
//"TagName으로 읽어오기: " + element1[0].innerHTML;
//document.getElementById("demo2").innerHTML =
//"ClassName으로 읽어오기: " + x[1].innerHTML;

const element = document.querySelector("#intro");
const element1 = document.querySelectorAll("h1");
const x = document.querySelectorAll(".intro");
querySelector;
document.querySelector("#demo").innerHTML = "복사한 내용: " + element.innerHTML;
document.querySelector("#demo1").innerHTML =
  "TagName으로 읽어오기: " + element1[0].innerHTML;
document.querySelector("#demo2").innerHTML =
  "ClassName으로 읽어오기: " + x[0].innerHTML;

const myRect = document.querySelector("#rect");

myRect.addEventListener("mouseover", function () {
  myRect.style.backgroundColor = "green";
  myRect.style.borderRadius = "50%";
});

myRect.addEventListener("mouseout", function () {
  myRect.style.backgroundColor = "red";
  myRect.style.borderRadius = "90%";
});
