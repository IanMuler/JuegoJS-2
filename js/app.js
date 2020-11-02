document.addEventListener('keyup', startControls)
const advice = document.querySelector('.advice')
const squares = document.querySelectorAll('.grid div')
const lose = document.querySelector('.lose')
const score = document.querySelector('.score')
const button = document.querySelector('.buttons')
button.addEventListener('click', startControls)

let playing = false
let direction = 0
let currentSnake = []
let freezeSnake = []
const intervalo = 70
let apple = 0
let tail = 0
let limits = []
let printing = 0

function startControls(e){
  
  if(printing === 0){
    if (!playing) {
        if (e.keyCode === 39 || e.keyCode === 40 || e.target.id === 'right' || e.target.id === 'down') {

            if (currentSnake === 0){
            freezeSnake.forEach(index => squares[index].classList.remove('snake'))
            squares[apple].classList.remove('apple')
            lose.classList.add('d-none')
            score.classList.add('d-none')

            direction = 0
            tail = 0
            apple = 0
            }
            
            advice.classList.add('d-none');
            
            if (e.keyCode === 39 || e.target.id === 'right'){
            direction = 'right' 
            currentSnake = [42,41]     
            }
            else {
              direction = 'down'
              currentSnake = [81,41]
              
            } 
            playing = true
            printSnake()
            randomApple();
          } 
    } else {
          printing = 1  
        if(e.keyCode === 39 && direction != 'left' || e.target.id === 'right' && direction != 'left' ) {
           direction = 'right'
          } else if (e.keyCode === 38 && direction != 'down' || e.target.id === 'up' && direction != 'down' ) {
            direction = 'up'
          } else if (e.keyCode === 37 && direction != 'right' || e.target.id === 'left' && direction != 'right' ) {
            direction = 'left'
          } else if (e.keyCode === 40 && direction != 'up' || e.target.id === 'down' && direction != 'up' ) {
            direction = 'down'
          }

    }
}
}

function printSnake(){
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    setTimeout(moveSnake, intervalo);
    
}

function moveSnake(){
    tail = currentSnake.pop()
    squares[tail].classList.remove('snake') 
    if(direction === 'right') {
        directionHead = 1
      } else if (direction === 'down') {
        directionHead = 40
      } else if (direction ==='left') {
        directionHead = -1
      } else if (direction === 'up') {
        directionHead = -40
      }
      currentSnake.unshift(currentSnake[0] + directionHead)
      printSnake();
      eatApple(); //question
      collision();//question
      printing = 0
}

function eatApple(){
    if(currentSnake[0] == apple)
    {   
        squares[apple].classList.remove('apple')
        randomApple()
        growSnake()
    }
}

function randomApple(){
    apple = Math.floor(Math.random() * squares.length)
    if(limits.some((element) => element == squares[apple])){
      randomApple()
    } else {
      squares[apple].classList.add('apple')
}
}

function growSnake(){
        const newtail = tail + directionHead
        currentSnake.push(newtail)
       
}

function collision(){
  if (limits.some((element) => element.classList.contains('snake')) || currentSnake.some((element) => element === currentSnake[0] + directionHead)){
    freezeSnake = currentSnake
    lose.classList.remove('d-none')
    score.classList.remove('d-none')
    score.innerHTML = `Score: ${currentSnake.length - 2}`
    currentSnake = 0
    setTimeout(playingFalse,2000)
    
  }
}

function playingFalse() {
  playing = false
  printing = 0
}

// limits value

for(i=0;i<40;i++){
  limits.push(squares[i]);
}
for(i=40;i<1600;i+=40){
  limits.push(squares[i]);
}
for(i=79;i<1600;i+=40){
  limits.push(squares[i]);
}
for(i=1560;i<1600;i++){
  limits.push(squares[i]);
}

