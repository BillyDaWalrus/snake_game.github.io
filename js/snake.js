const GAME_SPEED = 30
const GAME_WIDTH = 1000
const GAME_HEIGHT = 500

class Snake_Head {
    snake_length = 2
    snake = []
    x = GAME_WIDTH/2
    y = GAME_HEIGHT/2
    speed = 5
    direction = null
    canvas = $('#Canvas')[0];
    ctx = this.canvas.getContext('2d');

    constructor() {
        this.ctx.canvas.width = GAME_WIDTH
        this.ctx.canvas.height = GAME_HEIGHT
    }

    //Draws the Snake
    snake_draw() {
        this.snake.unshift([this.x, this.y])
        for (var i = 0; i < this.snake.length; i++) {
            //Resets Canvas
            this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            //Draws Snake
            for (var i = 0; i < this.snake.length; i++) {
                this.ctx.fillRect(this.snake[i][0], this.snake[i][1], 25, 25);
                this.snake.pop();
            }
        }
    }

    //Movement
    movement() {
        if (this.direction === 'up') {
            this.y -= this.speed;
        }

        if (this.direction === 'down') {
            this.y += this.speed;
        }

        if (this.direction === 'left') {
            this.x -= this.speed;
        }

        if (this.direction === 'right') {
            this.x += this.speed;
        }
    }

    //Check Direction Change
    direction_change(new_direction) {
        this.direction = new_direction;
    }
}


var player = new Snake_Head()
setInterval(() => {
    //Check Direction
    $(document).keydown(function (event) {
        //Player Movement: Up
        if (event.which === 87) {
            player.direction_change('up');
        }

        //Player Movement: Down
        if (event.which === 83) {
            player.direction_change('down');
        }

        //Player Movement: Left
        if (event.which === 65) {
            player.direction_change('left');
        }

        //Player Movement: Right
        if (event.which === 68) {
            player.direction_change('right');
        }
    });
    
    player.movement();
    player.snake_draw();

}, GAME_SPEED);
