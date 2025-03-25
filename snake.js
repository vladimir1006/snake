const canvas = document.getElementById('board');

const ctx = canvas.getContext("2d");


const gridSize = 20;
canvas.width = 400;
canvas.height = 400;


let continueGame = false;

let snake = [[380,200],[360,200],[340, 200],[320,200],[300,200]];
let direction = { x: gridSize, y: 0 };
let food = { x: 100, y: 200 };
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

start();

function start(){
    try{
        score = 0;
        drawFood();
        drawSnake();
        continueGame === false ? continueGame = true : continueGame = false;
        gameLoop();
    }
    catch(e){
        console.log(e);
    }
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
            //console.log(direction);
            
        }, 75 );
    }
}

function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = [ snake[0][0] + direction.x, snake[0][1] + direction.y ];
    snake.unshift(head);
    if (head[0] === food.x && head[1] === food.y) {
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
        ctx.fillRect(segment[0], segment[1], gridSize, gridSize);
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
    return tab[randomNumber(tab.length-1)];
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
    let diffX = food.x - snake[0][0];
    let diffY =  food.y - snake[0][1];
    
    if(diffX < 0 && !goingRight ) return checkAround("g");        
    if(diffX > 0 && !goingLeft ) return checkAround("d");
    if(diffY > 0 && !goingUp) return checkAround("b");
    if(diffY < 0 && !goingDown) return checkAround("h");
    console.log("pomme derrière");
    if(diffX == 0 || diffY == 0){
        if(goingUp) return checkAround("h");
        if(goingDown) return checkAround("b");
        if(goingRight) return checkAround("d");
        if(goingLeft) return checkAround("g");
    }
    alert("pomme est derrière");
    //if(diffx == 0 || diffY == 0)
        // faire pattern regonition pour aller à gauche ou droite 
    // if(diff ... && ...)
            // if(patternRegonition(droite) === rienàdroite ) return ...;
    
}

// function patternRegonition(args){
//     // va tout droit de base 
//     // si un mur ou snake devant 
//     // regarde à droite 
//     // si rien => go droite 
//     // sinon => go gauche 

//     // avant d'aller à droite 
//     // vérifier que ya pas un corps à droite sinon aller tout droit 


function checkAround(direction){
    let d,h,g,b;
    const head = snake[0];
    d = [head[0] + gridSize ,head[1]];
    g = [head[0] - gridSize ,head[1]];
    h = [head[0],head[1]-gridSize];
    b = [head[0],head[1]+gridSize];
    //1 = go gauche, 2 = go up, 3 = go droite, 4 = go bas
    if(direction == "h"){
        console.log(head);
        
        console.log(!snake.slice(1,-1).includes(h));
        if(h[1] >= 0 && h[1] < canvas.height && includesDECON(snake,h)) return 2;
        if(g[0] >= 0 && g[0] < canvas.width && includesDECON(snake,g)) return 1;
        if(d[0] >= 0 && d[0] < canvas.width && includesDECON(snake,d)) return 3; 
    }
    if(direction == "d"){
        console.log(head);
        console.log(snake)
        console.log(!snake.slice(1,-1).includes(d));
        if(d[0] >= 0 && d[0] < canvas.width && includesDECON(snake,d)) return 3;
        if(h[1] >= 0 && h[1] < canvas.height && includesDECON(snake,h)) return 2;
        if(b[1] >= 0 && b[1] < canvas.height && includesDECON(snake,b)) return 4;
    }
    if(direction == "b"){
        console.log(head);
        console.log(!snake.slice(1,-1).includes(b));
        if(b[1] >= 0 && b[1] < canvas.height && includesDECON(snake,b)) return 4;
        if(g[0] >= 0 && g[0] < canvas.width && includesDECON(snake,g)) return 1;
        if(d[0] >= 0 && d[0] < canvas.width && includesDECON(snake,d)) return 3;
    }
    if(direction == "g"){
        console.log(head);
        console.log(!snake.slice(1,-1).includes(g));
        if(g[0] >= 0 && g[0] < canvas.width && includesDECON(snake,g)) return 1;
        if(h[1] >= 0 && h[1] < canvas.height && includesDECON(snake,h)) return 2;
        if(b[1] >= 0 && b[1] < canvas.height && includesDECON(snake,b)) return 4;
    }
}

function includesDECON(snake,_case){
    for(let i = 1; i< snake.length - 1 ; i++){
        if(snake[i][0] == _case[0] && snake[i][1] == _case[1])
            return false;
    }
    return true;
}


function checkCollision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i][0] === snake[0][0] && snake[i][1] === snake[0][1]) endGame();
    }

    if (
        snake[0][0] < 0 ||
        snake[0][0] >= canvas.width ||
        snake[0][1] < 0 ||
        snake[0][1] >= canvas.height
    ) {
        endGame();
    }
}

function endGame() {
    food = {x: 200, y: 300};
    snake = [[100, 200 ]];
    direction = { x: gridSize, y: 0 };
    continueGame = false;
    gameOver();
}

async function gameOver(){
    var percentage = score/4000*100;
    cleanCanva();
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over !", 50, canvas.height/2);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#fff";
    await new Promise(r => setTimeout(r, 2000));
    start();
}
