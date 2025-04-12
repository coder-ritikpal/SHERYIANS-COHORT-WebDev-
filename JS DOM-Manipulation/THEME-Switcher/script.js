
let themeSwitch = document.querySelector(".ui-switch input"); 
let body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.style.backgroundColor = "black";
  body.style.color = "white";
  themeSwitch.checked = true; 
} else {
  body.style.backgroundColor = "white";
  body.style.color = "black";
  themeSwitch.checked = false; 
}

themeSwitch.addEventListener("change", function () {
  if (themeSwitch.checked) {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    localStorage.setItem("theme", "dark");
  } else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    localStorage.setItem("theme", "light");
  }
});


