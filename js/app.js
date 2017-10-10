var collisionCount=0; // for counting number of collisions

// Enemies our player must avoid
var Enemy = function(enemyLocX,enemyLocY,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=enemyLocX;
    this.y=enemyLocY;
    this.speed=speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(player.y===0||collisionCount==3){
        dt=0;
    }
    this.x += this.speed * dt;
    //when enemy-bugs reach the end,they again start from left
    if(this.x>=400){
        this.x=0;
    }
    //on colliding,resets the player's position
    if(collisionCount<3){
        if(player.y>=this.y-65 && player.x <=this.x+65 && player.y<=this.y+65 && player.x >=this.x-65){
            player.x = player.initialX;
            player.y = player.initialY;
            collisionCount++;//incrementing number of collisions for keeping track of available lives
        };
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(playerLocX,playerLocY){
    Enemy.call(this,playerLocX,playerLocY);
    this.initialX=playerLocX;
    this.initialY=playerLocY;
    this.score=0;
    this.sprite="images/char-horn-girl.png";
    delete this.speed;
}

Player.prototype.update=function(){
    //kept empty
}
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //on reaching the water,the game ends and shows the score
    if(this.y===0){
            showScore();
        }
}
//for moving the player
Player.prototype.handleInput=function(keyPress){
    if(this.y!=0 && collisionCount<=2){
        if (keyPress==="up" && this.y>0){
            this.y-=50;
        }

        if(keyPress==="down" && this.y<400){
            this.y+=50;
        }

        if (keyPress==="left" && this.x>0){
            this.x-=50;
        }

        if(keyPress==="right" && this.x<400){
            this.x+=50;
        }
    }
}

//class for gems that needs to be collected and have scores which depend upon its position and color
var Gem= function(gemLocX,gemLocY,color){
    this.x=gemLocX;
    this.y=gemLocY;
    this.color=color;
    if (this.color==="orange") {
        this.sprite="images/Gem Orange.png";
    }
    if (this.color==="blue") {
        this.sprite="images/Gem Blue.png";
    }
    if (this.color==="green") {
        this.sprite="images/Gem Green.png";
    }
    if (this.color==="star") {
        this.sprite="images/Star.png";
    }
}
//when a single gem is collected,it disappears and player gets the score
Gem.prototype.update=function(){
    if(player.y>=this.y-110 && player.x <=this.x+1 && player.y<=this.y+1 && player.x >=this.x-50){
        delete this.x;
        delete this.y;
        if (this.color==="orange"){
            player.score+=5;
        }
        else if (this.color==="blue"){
            player.score+=10;
        }
        else if (this.color==="green"){
            player.score+=15;
        }
        else if (this.color==="star"){
            player.score+=50;
        }
    }
}

Gem.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y,65,65);
    ctx.strokeStyle="black";
    ctx.lineWidth="2";
    ctx.font= "15pt Impact";
    if (this.color==="orange"){
        this.score="+5";
    }
    if (this.color==="blue"){
        this.score="+10";
    }
    if (this.color==="green"){
        this.score="+15";
    }
    if (this.color==="star"){
        this.score="+50";
    }
    ctx.strokeText(this.score,this.x+15,this.y+40);
}

//class for available lives
var Life=function(loc){
    this.x=loc;
    this.y=0;
    this.sprite="images/Heart.png";
}

Life.prototype.update=function(){
}
//on colliding,lives get reduced until it becomes zero and then the game stops
Life.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y,50,50);
    ctx.fillStyle="white";
    ctx.fillRect(55,15,30,30);
    ctx.font="20pt Impact";
    ctx.fillStyle="red";
    ctx.fillText(3-collisionCount,60,40);
    if(collisionCount===3){
        stopGame();
    }

}
//for showing the score on reaching water
var showScore=function(){
    ctx.font="bold 36pt Impact";
    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    ctx.lineWidth=3;
    ctx.textAlign="center";
    ctx.fillText("Congratulations!",250,250);
    ctx.strokeText("Congratulations!",250,250);
    ctx.font="bold 30pt Impact";

    ctx.fillText("Your Score: ",250,300);
    ctx.strokeText("Your Score: ",250,300);
                    // ctx.textAlign="right";
    ctx.fillText(player.score+10,370,300);
    ctx.strokeText(player.score+10,370,300);
    ctx.font="bold 30pt Impact";
    ctx.fillStyle="Black";
    ctx.fillText("Press Ctrl+R to play again",250,500);
}
//for stopping the game when all lives get used up
var stopGame=function(){
    ctx.font="bold 36pt Impact";
    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    ctx.lineWidth=3;
    ctx.textAlign="center";
    ctx.fillText("Game Over !",250,250);
    ctx.strokeText("Game Over !",250,250);
    ctx.fillText("Your Score: ",250,300);
    ctx.strokeText("Your Score: ",250,300);
                    // ctx.textAlign="right";
    ctx.fillText(player.score,390,300);
    ctx.strokeText(player.score,390,300);
    ctx.font="bold 30pt Impact";
    ctx.fillStyle="Black";
    ctx.fillText("Press Ctrl+R to play again",250,500);

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var gem1= new Gem(120,220,"orange");
var gem2= new Gem(320,130,"green");
var gem3= new Gem(420,300,"blue");
var gem4= new Gem(20,220,"blue");
var gem5= new Gem(420,130,"star")
var allGems=[gem1,gem2,gem3,gem4,gem5];//array of gems

var player=new Player(200,400);

var enemy1=new Enemy(100,50,30);
var enemy2=new Enemy(300,150,60);
var enemy3=new Enemy(200,230,90);
var enemy4=new Enemy(50,50,120);
var allEnemies=[enemy1,enemy2,enemy3,enemy4];//array of enemies

var life1=new Life(1);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
