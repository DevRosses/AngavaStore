/*--->> agrega funcionalidad a los botones <<---*/

let btnOpenMenu = document.getElementById("open-menu");

let btnCloseMenu = document.getElementById("close-menu");

let btnOpenCar = document.getElementById("open-car");

let btnCloseCar = document.getElementById("close-car");

let menu = document.getElementById("mobile-menu");

let MenuCar = document.getElementById("mobile-car");

let links = document.getElementsByClassName("links");

btnOpenMenu.addEventListener("click", () => {
  menu.classList.remove("disabled");
});

btnCloseMenu.addEventListener("click", () => {
  menu.classList.add("disabled");
});

btnOpenCar.addEventListener("click", () => {
  MenuCar.classList.remove("disabled");
});

btnCloseCar.addEventListener("click", () => {
  MenuCar.classList.add("disabled");
});

links.addEventListener("click", () => {
  menu.classList.add("disabled");
});

/*--->> Solicitamos lista de productos <<---*/

