/**
 * @description: The variables for the modal box that will appear in the end
 */
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

/**
 * @description: Enemies our player must avoid
 */
var Enemy = function(x, y, speed) {
		/**
		 * @description: Variables applied to each of our instances go here,
		 * we've provided one for you to get started
		 *
		 * The image/sprite for our enemies, this uses
		 * a helper we've provided to easily load images
		 */
		this.sprite = 'images/enemy-bug.png';
		this.x = x;
		this.y = y;
		this.speed = speed;
};

/**
 * Update the enemy's position, required method for game
 * @param: dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt, player) {
		/**
		 * @description: You should multiply any movement by the dt parameter
		 * which will ensure the game runs at the same speed for
		 * all computers.
		 */
		if (this.x >= 505) {
				this.x = -100;
		}

		/**
		 * @description: Update the position and (arbitrary) speed of the enemies
		 */
		this.x += (Math.random() * (this.speed * dt));

		/**
		 * @description: This condition checks if the distance between an enemy and the player is
		 * less than 60 pixels on the x-axis and less than 15 pixels on the y-axis.
		 * The "Math.abs()"-method makes sure that the distance to both sides of the
		 * objects counts for the collision check.
		 * The collision check is a simplified version of Antonella Dean's
		 * collision check: Copyright (c) 2018 Antonella Bernobich Dean;
		 * https://github.com/aberdean/google-scholarship-fend-projects/tree/master/classic-arcade-game-clone
		 */
		if ((Math.abs(player.x - this.x) <= 60) && (Math.abs(player.y - this.y) <= 15)) {
				player.x = 200;
				player.y = 400;
		}

		/**
		 * @description: When the player reaches the top line, the enemies stop
		 * moving
		 */
		if (player.y <= 71) {
				this.speed = 0;
		}
};

/**
 * @description: Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Now write your own player class
 * This class requires an update(), render() and a handleInput() method.
 */

/**
 * Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 */
var allEnemies = [];
/**
 * @param: x-position, y-position and (arbitrary!) speed of the enemies
 */
var enemyOne = new Enemy(-100, 60, (Math.random() * 930));
var enemyTwo = new Enemy(-350, 60, (Math.random() * 1000));
var enemyThree = new Enemy(-150, 145, (Math.random() * 720));
var enemyFour = new Enemy(-200, 145, (Math.random() * 780));
var enemyFive = new Enemy(-180, 228, (Math.random() * 650));
var enemySix = new Enemy(-120, 228, (Math.random() * 600));

/**
 * @description: Push enemies into array allEnemies to make them appear on screen
 */
allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive, enemySix);

/**
 * @description: Place the player object in a variable called player
 */
var Player = function(x, y, speed) {
		this.sprite = 'images/char-boy.png';
		this.x = x;
		this.y = y;
		this.speed = speed;
};

var player = new Player(200, 400, 10);

player.update = function() {
		/**
		 * @description: When the player reaches the top line, he wins
		 */
		if (this.y <= 71) {
				/**
				 * @description: The player's position is reset after 0.2 seconds
				 * The player cannot be moved any more
				 */
				this.handleInput = function() {
						this.x = 200;
						this.y = 400;
				}
				setTimeout(function () {
						this.x = 200;
						this.y = 400;
						/**
						 * @description: Show the modal box
						 */
						modal.classList.add("show-modal");
						closeButton.addEventListener("click", toggleModal);
						window.addEventListener("click", windowOnClick);
				}, 500);
		}
};

/**
 * TODO: Update the player.render-function to ES6 with the super class!
 * A very helpful comment from the code reviewer (implement this in the future):
 * If we analyse the code, we'll see that Enemy and Player classes have
 * attributes (x, y, sprite) identical, and the same render() method which has
 * the basically functionality principles.
 *
 * When two or more classes have attributes, and even methods of the same
 * functionality a good option is to use the inheritance concept of the object
 * oriented programming languages, where a super class is created and owns all
 * common attributes and methods of the classes, and the sub-classes inherit
 * from the super class. In this case, we could make a super class Character
 * with x, y, sprite attributes, and with the render() method, and the Player
 * and Enemy classes could be sub-classes that inherit from Character there
 * common attributes and methods.
 */
player.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description: Insert switch to determine what happens when a key is pressed;
 * switch credits:
 * https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/switch
 */
player.handleInput = function (pressKey) {
		switch (pressKey) {
				/**
				 * @description: Press the left key to move the player one step left
				 * on the x-axis
				 */
				case "left":
						/**
						 * @description: The player can only move left when (s)he is not in
						 * the ultimate left column
						 */
						if (this.x >= 100) {
								this.x -= 100;
						}
						else {
								return;
						}
						break;
				/**
				 * @description: Press the right key to move the player one step right
				 * on the x-axis
				 */
				case "right":
						/**
						 * @description: The player can only move right when (s)he is not in
						 * the ultimate right column
						 */
						if (this.x <= 300) {
								this.x += 100;
						}
						else {
								return;
						}
						break;
				/**
				 * @description: Press the up key to move the player one step up on the
				 * y-axis
				 */
				case "up":
						/**
						 * @description: The player can only move up when (s)he is not in
						 * the top row
						 */
						if (this.y >= 68) {
								this.y -= 82;
						}
						else {
								return;
						}
						break;
				/**
				 * @description: Press the down key to move the player one step down on
				 * the y-axis
				 */
				case "down":
						/**
						 * @description: The player can only move down when (s)he is not in
						 * the bottom row
						 */
						if (this.y < 400) {
								this.y += 82;
						}
						else {
								return;
						}
						break;
				default:
						return;
		}
};


/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
		var allowedKeys = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down'
		};

		player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * @description: Add restart button to the instruction section
 */
const restart = document.querySelector("#restart");
		restart.addEventListener("click", function() {
		window.location.reload();
});

/**
 * @description: This is the JS code for the modal box. The code is taken from
 * https://sabe.io/tutorials/how-to-create-modal-popup-box
 */

function toggleModal() {
		modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
		if (event.target === modal) {
				toggleModal();
		}
}

/**
 * @description: restart button to the modal box
 */
const restartModal = document.querySelector("#restart-modal");
		restartModal.addEventListener("click", function() {
		window.location.reload();
});

/**
 * @description: Add quit game button to the modal box
 */
const quit = document.querySelector("#quit-game");
		quit.addEventListener("click", function() {
		modal.classList.remove("show-modal");
});

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
