
let modal = document.querySelector(".start-game");
let overlay = document.querySelector(".overlay");
let gameover = document.querySelector(".game-over");
let winnerModal = document.querySelector(".winner");


var playerPoints = 0;
var playerLives = 3;


function startGame(){
    modal.classList.add("hide");
    overlay.classList.add("hide");

    
    playerPoints = 0;
}


function gameOver(){
    overlay.classList.add("show");
    gameover.classList.add("show");
}


function resetGame(){
    window.location.reload(true);
}

 
function checkLives(){
    if (alllives.length === 0){    
        gameOver()
    }
}


function youWin(){
    overlay.classList.add("show");
    winnerModal.classList.add("show");
}


var Enemy = function(x, y, speed = 1) {
    
    this.x = x;
    this.y = y;
    this.location = ( x, y);
    this.speed = speed;

    
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    this.x += 80 * this.speed * dt;
    
    if (parseInt(this.x)+ 100 >= playerX && parseInt(this.x) <= playerX + 40 && this.y === playerY){
        console.log("a collision just occured your player diessss");  
        player.reset();
        alllives.pop();
        playerLives -= 1
        if (playerPoints >= 50){
            playerPoints -= 50;
        }
    }
    checkLives();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function (x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
var playerX
var playerY

Player.prototype.update = function(){
    playerX = this.x;
    playerY = this.y;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(pressedKeys){
    if (pressedKeys === 'left' && this.x > 33){
        this.x -= 100;
    }
    else if (pressedKeys === 'up'&& this.y > 18){
        this.y -= 80;
    }
    else if (pressedKeys === 'right' && this.x < 400){
        this.x += 100
    }
    else if (pressedKeys === 'down' && this.y < 380){
        this.y += 80
    }
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}

var Lives = function(x, y){
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};

Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}

var Key = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
}

Key.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 130);
}


var Winblock = function(x, y){
    this.x = x;
    this.y = y
}

var winblockX
var winblockY
Winblock.prototype.update = function(){
    winblockX = this.x;
    winblockY = this.y;

    if((-Math.abs(winblockY)) == playerY && this.x == playerX){
        allKeys.push(new Key(winblockX, winblockY));
        playerPoints += 100;
        player.reset();
    }
    if (allKeys.length == 5){
        console.log("You Win");
        youWin();
    } 
}

var Points = function(x, y, score){
    this.x = x;
    this.y = y;
    this.score = "Your score: "+ playerPoints
}
Points.prototype.render = function(){
    ctx.font = '20px serif';
    ctx.fillText(this.score, this.x, this.y);
}
Points.prototype.update = function(){
    this.score = "Your score: "+ playerPoints
}

var columns = [ -5, -100, -200, -300, -400];
var enemyX;

var rows = [ 60, 140, 220];
var enemyY;

var enemySpeed;

setInterval(function instances(){
    enemyX = columns[Math.floor(Math.random() * 5)],
    enemyY = rows[Math.floor(Math.random() * 3)],
    enemySpeed = Math.floor(Math.random() * 15),
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed)); 
},500)




var player = new Player( 200, 380);

var allEnemies = [ new Enemy(-8, 60, 3), new Enemy(0, 140, 10), new Enemy(-5, 300, 15)];

var alllives = [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540)];

var points = new Points(350, 570);

var allKeys = [ ];

var winningblocks = [ new Winblock(0, 20), new Winblock(100, 20), new Winblock(200, 20), new Winblock(300, 20), new Winblock(400, 20)]
 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
