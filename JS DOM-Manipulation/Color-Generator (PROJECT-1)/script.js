<<<<<<< HEAD
let section = document.querySelector('.color-section')
let btn = document.querySelector('button')


btn.addEventListener("click", function () {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    section.style.backgroundColor = `rgb(${r},${g},${b})`
    

=======
let section = document.querySelector('.color-section')
let btn = document.querySelector('button')


btn.addEventListener("click", function () {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    section.style.backgroundColor = `rgb(${r},${g},${b})`
    

>>>>>>> ef78fc33d8f365fc2238ef23de97817f79f1f7ca
})