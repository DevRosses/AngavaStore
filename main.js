let btnOpenMenu = document.getElementById("open-menu");

let btnCloseMenu = document.getElementById("close-menu");

let menu = document.getElementById("mobile-menu");

let links = document.getElementsByClassName("links")

btnOpenMenu.addEventListener("click", () => {
  menu.classList.remove("disabled");
});

btnCloseMenu.addEventListener("click", () => {
  menu.classList.add("disabled");
});

links.addEventListener("click", () => {
  menu.classList.add("disabled");
});
