var tag = document.querySelector(".tag");
var growth = document.querySelector(".growth");
var percent = document.querySelector(".percent");
var speed = document.querySelector(".speed");

var grow = 0;
var btn = document.querySelector("button");

btn.addEventListener("click", function () {
  if (grow === 0 || grow === 100) {
    let time = Math.floor(Math.random() * 9 + 1); 

    let stop = setInterval(function () {
      if (grow < 100) {
        grow++;
      }
      let speedPerMs =  time*100;
      speed.innerHTML = `Speed (${speedPerMs}ms/%)`;
      speed.style.display = "block";
      percent.innerHTML = grow + "%";
      growth.style.width = grow + "%";

      btn.innerHTML = "Downloading...";
      tag.innerHTML = "Download Started";
    }, time * 10);

    setTimeout(() => {
      clearInterval(stop);
      btn.innerHTML = "Downloaded.";
      tag.innerHTML = "Download Done.";
      btn.style.opacity = 0.5;
      grow = 0; 
    }, time * 1000);
  }
});
