let canvas = document.getElementById("canvas");
const canvasInner = document.getElementById("canvas-inner");
const window_height = canvasInner.offsetHeight;
const window_width = canvasInner.offsetWidth;

canvas.width = window_height / 2
canvas.height = window_width / 2

let context = canvas.getContext("2d");

class Square {
    constructor(xpos, ypos, color) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.color = color;

        this.dy = 1;
    }

    draw(context) {
        context.beginPath();
        context.fillRect(this.xpos, this.ypos, 50, 50);
        context.closePath();
    }

    update() {
        context.clearRect(0, 0, window_width, window_height);

        this.draw(context);
        this.ypos += this.dy;
    }
}

let my_square = new Square(140, 0, "black");
my_square.draw(context)

let updateSquare = () => {
    requestAnimationFrame(updateSquare)
    my_square.update();
}
updateSquare();