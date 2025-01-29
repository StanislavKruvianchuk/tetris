const canvas = document.getElementById("canvas");
canvas.width = 300;
canvas.height = 600;
const context = canvas.getContext("2d");

const blockSize = 30;

const TETRIMINOS = {
    I: [
        [1, 1, 1, 1]
    ],
    O: [
        [1, 1],
        [1, 1]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1]
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1]
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1]
    ]
};

console.log(TETRIMINOS.I)

class Tetrimino {
    constructor(blockSize, xpos, ypos, shape, color) {
        this.blockSize = blockSize;
        this.xpos = xpos;
        this.ypos = ypos;
        this.shape = shape;
        this.color = color;
        this.dy = 2;
    }

    draw(context) {
        context.fillStyle = this.color;
        console.log(this.shape)

        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    const x = this.xpos + col * this.blockSize;
                    const y = this.ypos + row * this.blockSize;
                    context.fillRect(x, y, this.blockSize, this.blockSize);
                    context.strokeStyle = "#000";
                    context.strokeRect(x, y, this.blockSize, this.blockSize);
                }
            }
        }
    }


    update() {
        if (this.ypos == (canvas.height - (blockSize * this.shape.length))) {
            this.ypos = this.ypos
        } else {
            this.ypos += this.dy;

        }
    }
}


const tetrimino = new Tetrimino(
    blockSize,
    90,
    0,
    TETRIMINOS.I,
    "black"
);

const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    tetrimino.update();
    tetrimino.draw(context);
    requestAnimationFrame(animate);
};

const startGame = () => {
    const startButton = document.getElementById('start-game');

    startButton.addEventListener('click', () => {
        animate();
    })
}

startGame();
