let canvas = document.getElementById("canvas");
const canvasInner = document.getElementById("canvas-inner");
const window_height = canvasInner.offsetHeight;
const window_width = canvasInner.offsetWidth;

console.log(canvasInner)
console.log(window_height)


canvas.width = window_height / 2
canvas.height = window_width / 2

let context = canvas.getContext("2d");

context.fillRect(0, 0, 20, 20);
context.fillRect(0, 50, 20, 20);
context.fillRect(0, 90, 20, 20);