// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // set x,y coordinate and the speed.
    this.x = x;
    this.y = y;
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
    if (this.x > 500) {
        this.x = -130;
        this.speed = Math.random() * 200 + 90;
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
        this.currentPlayer = 1;

        this.playerWon = [null, null, null, null, null];
    }

    update() {
        if (this.y === -14) {
            this.x = 202;
            this.y = 406;

            switch (this.currentPlayer) {
                case 1:
                    this.playerWon[0] = true;
                    this.reset();
                    console.log('star1');
                    break;
                case 2:
                    this.playerWon[1] = true;
                    this.reset();
                    console.log('star2');
                    break;
                case 3:
                    this.playerWon[2] = true;
                    this.reset();
                    console.log('star3');
                    break;
                case 4:
                    this.playerWon[3] = true;
                    this.reset();
                    console.log('star3');
                    break;
                case 5:
                    this.playerWon[4] = true;
                    this.reset();
                    console.log('star3');
                    break;
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        if (key === 'left' && this.x != 0) {
            this.x = this.x - 101;
        } else if (key === 'up' && this.y != -14) {
            this.y = this.y - 84;
        } else if (key === 'right' && this.x != 404) {
            this.x = this.x + 101;
        } else if (key === 'down' && this.y != 406) {
            this.y = this.y + 84;
        }
    }

    reset() {
        this.currentPlayer += 1;

        switch (this.currentPlayer) {
            case 2:
                this.sprite = 'images/char-cat-girl.png'
                break;
            case 3:
                this.sprite = 'images/char-horn-girl.png'
                break;
            case 4:
                this.sprite = 'images/char-pink-girl.png'
                break;
            case 5:
                this.sprite = 'images/char-princess-girl.png'
                break;
        }
    }
}


// Gem class which instantiate stars to show that a player has won
class Gem {
    constructor(x, y, sprite = 'images/gem green.png') {
        this.x = x;
        this.y = y;
        // The image for our stars
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(-130, 63);
const enemy2 = new Enemy(-130, 145);
const enemy3 = new Enemy(-130, 227);
const enemy4 = new Enemy(-230, 63);
const enemy5 = new Enemy(-230, 227);

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player
const player = new Player(202, 406);


const gem1 = new Gem(0, -25);
const gem2 = new Gem(101, -25);
const gem3 = new Gem(202, -25);
const gem4 = new Gem(303, -25);
const gem5 = new Gem(404, -25);

const allGems = [gem1, gem2, gem3, gem4, gem5];

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
