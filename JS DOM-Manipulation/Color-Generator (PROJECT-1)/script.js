let section = document.querySelector('.color-section')
let btn = document.querySelector('button')


btn.addEventListener("click", function () {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    section.style.backgroundColor = `rgb(${r},${g},${b})`
    

})