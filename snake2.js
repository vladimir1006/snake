const canvas = document.getElementById('board');

const ctx = canvas.getContext("2d");


const gridSize = 20;
canvas.width = 400;
canvas.height = 400;


let continueGame = false;

let snake = [{ x: 320, y: 200 }];
let direction = { x: gridSize, y: 0 };
let food = { x: 100, y: 100 };
let score = 0;


possibleIndex = new Array();
    
for(var i = 0; i < 20; i++){
    for(var j = 0; j < 20; j++){
      var x,y;
      x = i *20; y = j * 20;
        possibleIndex.unshift([x,y])
    }
}


function cleanCanva(){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function start(){
    score = 0;
    drawFood();
    drawSnake();
    continueGame === false ? continueGame = true : continueGame = false;
    gameLoop();
}

function gameLoop() {
    let number = algoPhare();
    if(continueGame){
        setTimeout(() => {
            clearCanvas();
            changeDirection(number);
            moveSnake();
            drawSnake();
            //generateFood();
            drawFood();
            checkCollision();
            gameLoop();
        }, 75 );
    }
}

function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
        //let newXY = excluded_Array(0,canvas.width/gridSize -1);
        //food = { x: newXY[0], y: newXY[1]};
        //console.log(food);
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = '#00ff00';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function generateFood() {
    let newXY;
    newXY = excluded_Array(0,canvas.width/gridSize -1);
    //newX = Math.floor(Math.random()*canvas.width/gridSize)*gridSize;
    //newY = Math.floor(Math.random()*canvas.height/gridSize)*gridSize;
    food = { x: newXY[0], y: newXY[1] };
    
}

function drawFood() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function changeDirection(number) {

    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;
    //1 = go gauche, 2 = go up, 3 = go droite, 4 = go bas
    if (number == 1 && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    }
    else if (number == 2 && !goingDown) {
        direction = { x: 0, y: -gridSize };
    }
    else if (number == 3 && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    }
    else if (number == 4 && !goingUp) {
        direction = { x: 0, y: gridSize };
    }
    
}

function excluded_Array(start, end,char){
    
    const tab = possibleIndex.filter( element => !snake.some( el => JSON.stringify(el) === JSON.stringify(element) ) );
    console.log(tab);
    return tab[randomNumber(tab.length-1)];

    // let excluded_list = [];
    // for(let i = 0; i< snake.length; i++){
    //     if(char === "x" ){
    //         excluded_list.push(snake[i].x);
    //     }
    //     else{
    //         excluded_list.push(snake[i].y);
    //     }
    // }
    // let possible_numbers = Array.from({length: end - start + 1}, (_, i) => gridSize * i )
    // .filter(    num => !excluded_list.includes(num));
    // //console.log(possible_numbers[randomNumber(possible_numbers.length-1)]);
    // return possible_numbers[randomNumber(possible_numbers.length-1)];
}


function randomNumber(number){
    return Math.floor(Math.random() * number ) + 1;
}


function algoPhare(){
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;
    // marche pas quand l'apparition de la nouvelle pomme est pile derrière lui 
    let diffX = food.x - snake[0].x;
    let diffY =  food.y - snake[0].y;
    if(diffX < 0 && !goingRight ) return 1;
    if(diffX > 0 && !goingLeft ) return 3;
    if(diffY > 0 && !goingUp) return 4;
    if(diffY < 0 && !goingDown) return 2;
    
}

function algoDifférenceCartésienne(){ // marche faut changer
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    let diffX = food.x - snake[0].x;
    let diffY =  food.y - snake[0].y;
    console.log(diffX + " " + diffY);

    if(diffX <= 0 && diffY <= 0){
        choix = [1,2];
        //if(goingRight) return 2;
        //if(goingDown) return 1;
        return choix[Math.floor(Math.random() * choix.length)]; 
    }
    if(diffX >= 0 && diffY <= 0){
        choix = [3,2];
        if(goingLeft) return 2;
        if(goingDown) return 3;
        return choix[Math.floor(Math.random() * choix.length)]; 
    }
    if(diffX >= 0 && diffY >= 0){
        choix = [4,3];
        if(goingUp) return 3;
        if(goingLeft) return 4;
        return choix[Math.floor(Math.random() * choix.length)]; 
    }
    if(diffX <= 0 && diffY >= 0){
        choix = [1,4];
        if(goingUp) return 1;
        if(goingRight) return 4;
        return choix[Math.floor(Math.random() * choix.length)]; 
    }
    //1 = go gauche, 2 = go up, 3 = go droite, 4 = go bas
    alert("erreur de direction");
}


function checkCollision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) endGame();
    }

    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        endGame();
    }
}

function endGame() {
    food = {x: 200, y: 300};
    snake = [{ x: 100, y: 200 }];
    direction = { x: gridSize, y: 0 };
    continueGame = false;
    gameOver();
}

function gameOver(){
    cleanCanva();
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over !", 50, canvas.height/2);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score : "+score.toString(), 125, 250);
}
