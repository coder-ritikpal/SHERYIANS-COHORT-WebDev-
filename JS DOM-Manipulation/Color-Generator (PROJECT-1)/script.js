
let section = document.querySelector('.color-section')
let btn = document.querySelector('button')
let h2=document.querySelector('h2')


btn.addEventListener("click", function () {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    section.style.backgroundColor = `rgb(${r},${g},${b})`
    h2.innerHTML = `rgb(${r},${g},${b})`;

})