//alert("안녕하세요");
//let reply = confirm("배경 이미지를 바꾸시겠습니까?");
//console.log(reply);
//document.writeln("배경이미지 변경:", reply,"<br>");
//let name = prompt("당신의 이름은?", "홍길동");
//console.log("내 이름은", name, "입니다");
//document.writeln("내 이름은", name, "<h1>입니다","<br>")

//let newyear
//newyear = 2030
//let currentyear = 2026
//currentyear = '2026년'

//const birthyear = 2000

//let isempty = true
//let date= new Date()
//console.log(typeof date)

//let season = ["봄","여름","가을","겨울"]

//let usernumber = prompt("숫자를 입력하세요")

//if (usernumber !== null) {
//  if (usernumber % 3 === 0) ? alert("3의 배수입니다")
//: alert("3의 배수가 아닙니다")
// }   else alert("입력이 취소되었습니다")

let n = prompt("숫자를 입력하세요");
let msg = "";

if (n !== null) {
  let nFact = 1;
  let i = 1;
  while (i <= n) {
    nFact *= i;
    i++;
  }
  msg = n + "! = " + nFact;
} else msg = "값을 입력하지 않았습니다";

document.writeln(msg);

function addNumber() {
  let num1 = 2;
  num1 = 5;
  let num2 = 3;
  let sum = num1 + num2;
  num3 = 10;
  alert("Result=", +sum);
}

function addNumber(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

let addNumber3 = (num1, num2) => {
  let sum = num1 + num2;
  return sum;
};

let a = 10,
  b = 14;
let result = addNumber(a, b);
console.log(a + "+", b, "=", addNumber(a, b));
console.log(a + "+", b, "=", addNumber(a, b));
console.log(a + "+", b, "=", addNumber(a, b));

//let result1 = addNumber(1, 2);
//let result2 = addNumber(4, 6);

//addNumber();

//1
let changeBtn = document.querySelector("#change");
changeBtn.onclick = changeColor;

document.querySelector("#change").onclick = changeColor;


  document.querySelector("p").style.color = "#ff0000";
  changeBtn.style.color = "#0000ff";
  changeBtn.style.backgroundColor = "yellow";
}
changeBtn.onclick = changeColor;

document.querySelector("#change").onclick = changeColor;