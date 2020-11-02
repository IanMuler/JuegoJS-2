document.addEventListener('keyup', startControls)
const advice = document.querySelector('.advice')
const squares = document.querySelectorAll('.grid div')
const lose = document.querySelector('.lose')

let playing = false
let direction = 0
let currentSnake = [42,41]
const intervalo = 70
let apple = 0
let tail = 0
let limits = []
const find = 0;
function startControls(e){
    if (!playing) {
        if (e.keyCode === 39 || e.keyCode === 40) {
            advice.classList.add('d-none');
            e.keyCode === 39 ? direction = 'right' : direction = 'down';
            playing = true
            printSnake()
            randomApple();
        } 
        
    } else {  
        if(e.keyCode === 39 && direction != 'left') {
           setTimeout(direction = 'right',10)
          } else if (e.keyCode === 38 && direction != 'down') {
            setTimeout(direction = 'up',10)
          } else if (e.keyCode === 37 && direction != 'right') {
            setTimeout(direction = 'left',10)
          } else if (e.keyCode === 40 && direction != 'up') {
            setTimeout(direction = 'down',10)
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
        console.log(currentSnake)
}

function collision(){
  if (limits.some((element) => element.classList.contains('snake')) || currentSnake.some((element) => element === currentSnake[0] + directionHead)){
    currentSnake = 0
    lose.classList.remove('d-none')
  }
}

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
console.log(limits);

