const start = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timesBtnList = document.querySelector('#time-list') // список кнопок
let score = 0

const colors = [
 '#00FF00',
 '#FF69B4',
 '#FFFF00',
 '#770000',
  '#00FFFF	',
  '#FF6347',
  '#FAEBD7',
  '#9400D3',
  '#008080',
  '#FF4500'
 ]
const board = document.querySelector('#board')
board.addEventListener('click', (event) => {
 if (event.target.classList.contains('circle')) {
  score++
  event.target.remove()
  CreateRandomRipple()
 }
})

let time = 0

const timer = document.querySelector('#time')

start.addEventListener('click', (event) => {
 event.preventDefault()
 screens[0].classList.add('up')
})
timesBtnList.addEventListener('click', (event) => {
 // contains - метод проверки наличия класса
 if (event.target.classList.contains('time-btn')) { 
  // получить служебную инфу с кнопок
   time = parseInt(event.target.getAttribute('data-time'))
  startGame()
 }
})

function startGame() {
 setInterval(Timer, 1000)
 CreateRandomRipple()
 screens[1].classList.add('up')
 HelperSetTime(time)
}

function Timer() {
 if (time === 0) {
  FinishGame()
 }
 else {
  let current =  --time
  if (current < 10) {
   current = `0${current}`
  }
  HelperSetTime(current)
 }
}


function HelperSetTime(value) {
 timer.innerHTML = `00:${value}`
}


function FinishGame() {
 timer.parentNode.remove()
 board.innerHTML = `<h1>Результат:<span class="primary"> ${score}</span></h1>`
}

function CreateRandomRipple() {
 const ripple = document.createElement('div')
 const size = setRandom(10, 60)
 const {width, height} = board.getBoundingClientRect()
 const positionX = setRandom(0, width - size)
 const positionY = setRandom(0, height - size)
 ripple.classList.add('circle')
 ripple.style.width = `${size}px`
 ripple.style.height = `${size}px`
 ripple.style.top = `${positionY}px`
 ripple.style.left = `${positionX}px`

 board.append(ripple)
 setRandomColor(ripple)

}

function setRandom(max, min) {
 return Math.floor(Math.random() * (max -min) +min)
}


function setRandomColor(element) {
 const colorsSet = RandomColors()
 element.style.backgroundColor =colorsSet
}


function RandomColors() {
 const indexColor =  Math.floor(Math.random()* colors.length)
 return colors[indexColor]
 }
