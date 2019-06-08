// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // set x,y coordinate and the speed.
    this.x = x;
    this.y = y;

    // Set random speed from 90 (min speed) to 290 (max speed)
    this.speed = Math.random() * 200 + 90;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // Check if enemy cross the screen set to initial location
    if (this.x > 500) {
        this.x = -130;

        // Set random speed from 90 (min speed) to 290 (max speed)
        this.speed = Math.random() * 200 + 90;
    }

    // check Collisions
    if (parseInt(this.x, 10) < player.x && parseInt(this.x, 10) + 60 > player.x && this.y === player.y ||
        parseInt(this.x, 10) > player.x && parseInt(this.x, 10) - 60 < player.x && this.y === player.y  ) {
        // set playerWon array item to false if player win
        player.playerWon[player.currentPlayer] = false;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // The image/sprite for our player
        this.sprite = 'images/char-boy.png';
        this.currentPlayer = 0;

        // an array to store each try result, true (for winning), false (for failing)
        this.playerWon = [null, null, null, null, null];
    }

    update() {
        // Check if the player crossed to the water
        if (this.y === -20) {
            // this.x = 202;
            // this.y = 400;
            // set playerWon array item to true if player win
            switch (this.currentPlayer) {
                case 0:
                    this.playerWon[0] = true;
                    this.reset();
                    break;
                case 1:
                    this.playerWon[1] = true;
                    this.reset();
                    break;
                case 2:
                    this.playerWon[2] = true;
                    this.reset();
                    break;
                case 3:
                    this.playerWon[3] = true;
                    this.reset();
                    break;
                case 4:
                    this.playerWon[4] = true;
                    this.reset();
                    break;
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Move the player around but not off screen
    handleInput(key) {
        if (key === 'left' && this.x != 0) {
            this.x = this.x - 101;
        } else if (key === 'up' && this.y != -20) {
            this.y = this.y - 84;
        } else if (key === 'right' && this.x != 404) {
            this.x = this.x + 101;
        } else if (key === 'down' && this.y != 400) {
            this.y = this.y + 84;
        }
    }

    reset() {
        // Counter increases every time a player cross or collide
        this.currentPlayer += 1;
        this.x = 202;
        this.y = 400;

        // Change the player character
        switch (this.currentPlayer) {
            case 1:
                this.sprite = 'images/char-cat-girl.png'
                break;
            case 2:
                this.sprite = 'images/char-horn-girl.png'
                break;
            case 3:
                this.sprite = 'images/char-pink-girl.png'
                break;
            case 4:
                this.sprite = 'images/char-princess-girl.png'
                break;
            case 5:
                // Stop the game
                Enemy.prototype.update = function() {};
                player.handleInput = function() {};

                // Loop through all of the items within the playerWon array and count winnig try
                let winCounter = 0;
                this.playerWon.forEach(function(won) {
                    if (won) {
                        winCounter += 1;
                    }
                });

                if (winCounter > 2) {
                    const winHTML = `<div>Congratulation! You Won!<p>You have reached the water ${winCounter}
                                          times and got ${winCounter} gems. To play again refresh the page.</p></div>`;
                    document.body.insertAdjacentHTML('afterbegin', winHTML);
                } else {
                  const winHTML = `<div>Game Over!<p>Try again. You have to reach the water 3 times at least
                                        . To play again refresh the page.</p></div>`;
                  document.body.insertAdjacentHTML('afterbegin', winHTML);
                }
        }
    }
}


// Gem class which instantiate gems to show that a player has crossed
class Gem {
    constructor(x, y, sprite = 'images/gem green.png') {
        this.x = x;
        this.y = y;
        // The image for our gems
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Create new Rock class as a subclass of Gem
class Rock extends Gem {
    constructor(x, y, sprite = 'images/rock.png') {
        super(x, y, sprite);
    }

    render() {
        super.render();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(-130, 64);
const enemy2 = new Enemy(-130, 148);
const enemy3 = new Enemy(-130, 232);
const enemy4 = new Enemy(-230, 64);
const enemy5 = new Enemy(-230, 232);

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Instantiate and place the player object in a variable called player
const player = new Player(202, 400);

// Instantiate gems
const gem1 = new Gem(0, -25);
const gem2 = new Gem(101, -25);
const gem3 = new Gem(202, -25);
const gem4 = new Gem(303, -25);
const gem5 = new Gem(404, -25);

// Place all gems objects in an array called allGems
const allGems = [gem1, gem2, gem3, gem4, gem5];


// Instantiate rocks
const rock1 = new Rock(0, -25);
const rock2 = new Rock(101, -25);
const rock3 = new Rock(202, -25);
const rock4 = new Rock(303, -25);
const rock5 = new Rock(404, -25);

// Place all rocks objects in an array called allRocks
const allRocks = [rock1, rock2, rock3, rock4, rock5];



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
