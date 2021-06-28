// declarations
const controlsColors = document.querySelectorAll(".controls__colors");
const rangeInput = document.querySelector(".range");
const drawMode = document.querySelector(".drawMode");
const drawSave = document.querySelector(".drawSave");

// canvas
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
//painting
let paintingMode = false;
let fillMode = false;
let color = "white";

// context
canvas.width = 700;
canvas.height = 600;

ctx.lineWidth = 3;
ctx.strokeStyle = color;

ctx.fillStyle = color;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// apply colors to items
const colors = ["red", "green", "blue", "yellow", "black"];
[...controlsColors].forEach((e, i) => {
  e.style.backgroundColor = colors[i];
  e.addEventListener("click", () => (ctx.strokeStyle = color = colors[i]));
});
// #colors

// functions
const onMouseMove = (e) => {
  x = e.offsetX;
  y = e.offsetY;
  // drawing
  !paintingMode
    ? (ctx.beginPath(), ctx.moveTo(x, y))
    : (ctx.lineTo(x, y), ctx.stroke());
};

// fix range for drawing lineWidth
const drawingLineWidth = (e) => (ctx.lineWidth = e.target.value);

// draw mode
const drawModeSelection = (e) => {
  console.log(e.target);
  !fillMode
    ? ((e.target.textContent = "fill mode"), (fillMode = true))
    : ((e.target.textContent = "draw mode"), (fillMode = false));
};
// filling background
const fillingBackground = () => {
  if (fillMode) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

// downloadImage
const downloadImage = () => {
  const img = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = img;
  link.download = "Paint";
  link.click();
};

//canvas events
if (canvas) {
  rangeInput.addEventListener("change", drawingLineWidth);
  drawMode.addEventListener("click", drawModeSelection);
  drawSave.addEventListener("click", downloadImage);

  canvas.addEventListener("click", fillingBackground);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", () =>
    !fillMode ? (paintingMode = true) : (paintingMode = false)
  );
  canvas.addEventListener("mouseup", () =>
    fillMode ? (paintingMode = false) : (paintingMode = false)
  );
  canvas.addEventListener("mouseleave", () =>
    fillMode ? (paintingMode = false) : (paintingMode = false)
  );
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}
