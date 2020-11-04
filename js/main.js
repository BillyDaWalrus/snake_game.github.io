const GAME_SPEED = 120
const GAME_WIDTH = 1000
const GAME_HEIGHT = 500

class Snake_Head {
    snake_length = 3
    snake = []
    x = GAME_WIDTH / 2
    y = GAME_HEIGHT / 2
    speed = 25
    direction = 'up'
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
            for (var i = 0; i < this.snake_length; i++) {
                this.ctx.fillStyle = "#000000";
                this.ctx.fillRect(this.snake[i][0], this.snake[i][1], this.speed, this.speed);
            }
            this.snake.pop();
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

    direction_var() {
        return (this.direction)
    }

    //Check food collision
    food_collide(food_coords) {
        if (this.x < food_coords[0] + 25 &&
            this.x + this.speed > food_coords[0] &&
            this.y < food_coords[1] + 25 &&
            this.y + this.speed > food_coords[1]) {
            return (true)
        }
        else {
            return (false)
        }
    }

    growth(check) {
        if (check) {
            this.snake_length += 1
        }
    }

    game_over() {
        // border check
        if (this.x + this.speed > GAME_WIDTH ||
            this.x < 0 ||
            this.y + this.speed > GAME_HEIGHT ||
            this.y < 0) {
                console.log("game over")
            }
        
        /*
        for (var i = 0; i < this.snake_length; i++) {
            if (this.x < this.snake[i][0] + this.speed &&
                this.x + this.speed > this.snake[i][0] &&
                this.y < this.snake[i][1] + this.speed &&
                this.y + this.speed > this.snake[i][1]){
                    console.log("game over")
                }
        }
        */
    }
}

class Food_Object {
    width = 25
    height = this.width
    food_x = Math.floor(Math.random() * (GAME_WIDTH - this.width))
    food_y = Math.floor(Math.random() * (GAME_HEIGHT - this.height))
    canvas = $('#Canvas')[0];
    ctx = this.canvas.getContext('2d');

    constructor() {
        this.ctx.canvas.width = GAME_WIDTH
        this.ctx.canvas.height = GAME_HEIGHT
    }

    food_draw() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.food_x, this.food_y, this.width, this.height);
        return [this.food_x, this.food_y];
    }

    food_new_coords(check) {
        if (check === true) {
            this.food_x = Math.floor(Math.random() * (GAME_WIDTH - this.width));
            this.food_y = Math.floor(Math.random() * (GAME_HEIGHT - this.height));
        }
    }
}

var player = new Snake_Head()
var food = new Food_Object()
setInterval(() => {
    direction_var = player.direction_var()
    //Check Direction
    $(document).keydown(function (event) {
        //Player Movement: Up
        if (event.which === 87 && direction_var != 'down') {
            player.direction_change('up');
        }

        //Player Movement: Down
        if (event.which === 83 && direction_var != 'up') {
            player.direction_change('down');
        }

        //Player Movement: Left
        if (event.which === 65 && direction_var != 'right') {
            player.direction_change('left');
        }

        //Player Movement: Right
        if (event.which === 68 && direction_var != 'left') {
            player.direction_change('right');
        }
    });

    player.game_over();
    player.movement();
    player.snake_draw();
    food_coords = food.food_draw();
    check = player.food_collide(food_coords);
    food.food_new_coords(check);
    player.growth(check);
}, GAME_SPEED);
