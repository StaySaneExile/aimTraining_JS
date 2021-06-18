const startBtn = document.querySelector('#start')
const timeList = document.querySelector('#time-list')
const screens = document.querySelectorAll('.screen')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#DAA520','#7FFFD4','#5F9EA0','#B0E0E6','#0000CD','#DA70D6','#EEE8AA','#FFE4B5']

let time = 0
let score = 0

startBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (e)=> {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (e)=> {
    if(e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createCircle()
    }
})

function startGame() {
    setInterval(setTime , 1000)
    createCircle()
    toTime(time)
}

function setTime() {
    if(time === 0 ) {
        finishGame()
    } else {
        let current = --time
        if(current < 10) {
            current = `0${current}`
        } 
        toTime(current)
    }
}

function toTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Your score: ${score}</h1>`
}

function createCircle() {
    const circle = document.createElement('div')

    circle.classList.add('circle')

    const size = randomNum(10, 40)
    const {width, height} = board.getBoundingClientRect()
    const x = randomNum(0, width - size)
    const y = randomNum(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.style.background = colors[randomNum(0, colors.length)]

    board.append(circle)
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max-min) + min)
}