"use strict"
var score = 0;

// Enemies our player must avoid
/**
* @description Represents the Enemy
* @param {var} x - x coardinate of the Enemy position
* @param {var}y - y coardinate of the Enemy position
*/
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.randomSpeed(); 
};

/**
* @description Represents the player
* @param {var} x - x coardinate of the player position
* @param {var}y - y coardinate of the player position
*/
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

/**
* @description Represents the speed of the vehicles
* @returns a random speed for the enemy(min speed assigned to be 50 and max speed 
* assigned to be 150)
*/
Enemy.prototype.randomSpeed = function() {
    var speed = Math.random() * 100 + 50;
    return Math.floor(speed); 
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 400) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = 0;
        this.speed = this.randomSpeed();
    }
    
};

/**
 * @description we set the limitation for the player movement so
 *  he won't jump outside the borders of the screen
 * for loop checks if any of 3 enemies positions are same as our player,
 * bring him to the initial point.
 */
Player.prototype.update = function() {
    
    for(var i = 0; i < 3; i++) {
        if((this.y + 40 > allEnemies[i].y) &&
         (this.y < allEnemies[i].y + 40)  && (this.x < allEnemies[i].x + 50) 
        && (this.x + 50 > allEnemies[i].x)) {
            this.y = 460;

        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(button) {
if(button == 'left') {
    if (this.x > 0){
        this.x = this.x - 100;
    }

} else if (button =='right') {
    if(this.x < 400) {
        this.x = this.x + 100;
    }

} else if(button =='up') {
    if(this.y > 60) {
        this.y = this.y - 80;
    } else {
        this.y = 460;
        score = score + 1;

        $("#score").text("score" + score);
    }

}else if (button =='down') {
    if(this.y < 400) {
        this.y = this.y + 80;
    }
}
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0,60),
    new Enemy(0,145),
    new Enemy(0, 230) 
];

var player = new Player(200,300);
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
