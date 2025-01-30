const canvas = document.getElementById("canvas");
canvas.width = 300;
canvas.height = 600;
const context = canvas.getContext("2d");

const blockSize = 30;
const rows = canvas.height / blockSize;
const cols = canvas.width / blockSize;


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

    update(board) {
        if (this.ypos + this.shape.length * this.blockSize >= canvas.height || this.checkCollision(board)) {
            this.fixToBoard(board);
            return true;
        } else {
            this.ypos += this.dy;
            return false;
        }
    }

    checkCollision(board) {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    console.log('col', col)
                    console.log('row', row)
                    const x = (this.xpos / blockSize) + col;
                    const y = (this.ypos / blockSize) + row;

                    console.log('colX', x)
                    console.log('rowY', y)
                    if (y >= rows || board[y]?.[x]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    fixToBoard(board) {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    const x = (this.xpos / blockSize) + col;
                    const y = (this.ypos / blockSize) + row;
                    if (y < rows && x < cols) {
                        board[y][x] = this.color;
                    }
                }
            }
        }
    }
}

// Створив ігрове поле
const board = Array.from({ length: rows }, () => Array(cols).fill(null));

let activeTetrimino = null;

const addNewTetrimino = () => {
    const shapes = Object.keys(TETRIMINOS);
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;

    activeTetrimino = new Tetrimino(
        blockSize,
        Math.floor((cols / 2 - TETRIMINOS[randomShape][0].length / 2)) * blockSize,
        0,
        TETRIMINOS[randomShape],
        color
    );
};

const drawBoard = () => {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col]) {
                context.fillStyle = board[row][col];
                context.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
                context.strokeStyle = "#000";
                context.strokeRect(col * blockSize, row * blockSize, blockSize, blockSize);
            }
        }
    }
};

const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard();
    if (activeTetrimino) {
        const isStopped = activeTetrimino.update(board);
        if (isStopped) {
            addNewTetrimino();
        }
        activeTetrimino.draw(context);
    }
    requestAnimationFrame(animate);
};

const startGame = () => {
    const startButton = document.getElementById("start-game");

    startButton.addEventListener("click", () => {
        addNewTetrimino();
        animate();
    });
};

startGame();