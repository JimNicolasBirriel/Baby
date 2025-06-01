document.body.style.touchAction = "none";

const canvas = document.querySelector("canvas");
const contenedor = document.querySelector(".contenedor_raspable");
const ctx = canvas.getContext("2d");

canvas.width = contenedor.clientWidth;
canvas.height = contenedor.clientHeight;

ctx.fillStyle = "gray";
ctx.fillRect(0,0, canvas.width, canvas.height);

ctx.globalCompositeOperation = "destination-out";

let isDrawing = false;

function posicion(e){
    const rect = canvas.getBoundingClientRect();
    return{
        x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
        y: (e.touches ? e.touches[0].clientY : e.clientY)- rect.top
    };
}

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", draw);

function draw (e){
    if(!isDrawing)return;
    e.preventDefault();
    const pos = posicion(e);

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 17,0,2 * Math.PI);
    ctx.fill();
}