// declarations
const controlsColors = document.querySelectorAll(".controls__colors");
const rangeInput = document.querySelector(".range");

// canvas
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 600;

ctx.lineWidth = 3;
ctx.strokeStyle = "black";

//painting
let painting = false;

// apply colors to items
const colors = ["red", "green", "blue", "yellow", "black"];
[...controlsColors].forEach((e, i) => {
  e.style.backgroundColor = colors[i];
  e.addEventListener("click", () => (ctx.strokeStyle = colors[i]));
});
// #colors

// functions
const onMouseMove = (e) => {
  x = e.offsetX;
  y = e.offsetY;
  // drawing
  !painting
    ? (ctx.beginPath(), ctx.moveTo(x, y))
    : (ctx.lineTo(x, y), ctx.stroke());
};

// fix range for drawing lineWidth
const drawingLineWidth = (e) => (ctx.lineWidth = e.target.value);

//canvas events
if (canvas) {
  rangeInput.addEventListener("change", drawingLineWidth);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", () => (painting = true));
  canvas.addEventListener("mouseup", () => (painting = false));
  canvas.addEventListener("mouseleave", () => (painting = false));
}
