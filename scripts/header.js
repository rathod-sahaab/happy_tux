const menu = document.getElementsByTagName("nav")[0];
const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");

openMenu.addEventListener("click", function() {
  menu.classList.add("on-screen");
});

closeMenu.addEventListener("click", function() {
  menu.classList.remove("on-screen");
});

/*Fill space under header to begin page after header*/
let filler = document.createElement("div");
const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("header")[0];

filler.id = "header-filler";
filler.style.height = header.offsetHeight + "px";

body.insertBefore(filler, header);
