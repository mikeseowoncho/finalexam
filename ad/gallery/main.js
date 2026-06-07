const current = document.getElementById("current");
const imgs = document.querySelectorAll(".imgs img");

imgs.forEach((img) => {
    img.addEventListener("click",  {imgClick});

function imgClick(e) {
    imgs.forEach((img) => img.classList.remove("active"));
    current.src = e.target.src;
}

setTimeout(() => current.classList.remove("fade-in"));

e.target.style.opacity= "0.4";