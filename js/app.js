// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // set x,y coordinate and the speed.
    this.x = x;
    this.y = y;
    this.speed = speed;


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
    this.x = (this.x + 5) * dt;
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
  }

  update() {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    if (key === 'left') {
      this.x = this.x - 101;
    } else if (key === 'up') {
      this.y = this.y - 84;
    } else if (key === 'right') {
      this.x = this.x + 101;
    } else if (key === 'down') {
      this.y = this.y + 84;
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(1, 2, 2);
const enemy2 = new Enemy(5, 5, 3);
const enemy3 = new Enemy(10, 10, 1);

allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
const player = new Player(202, 406);




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
