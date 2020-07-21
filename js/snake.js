import {Food} from "./food";

var Snake_Head = function () {
    var ctx = $('#Canvas')[0].getContext('2d');
    ctx.beginPath();
    ctx.fill(255, 0, 0)
    ctx.rect(20, 20, 100, 100);
    ctx.stroke();
}

class Snake{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.food = new Food(50, 50)
    }
    print() {
        console.log(this.x, this.y)
    }
}

var player = new Snake(50, 60)
player.print()

