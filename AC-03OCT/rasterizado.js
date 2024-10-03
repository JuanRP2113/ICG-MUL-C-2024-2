class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const points = [
    new Punto(0, 0),
    new Punto(2, 1),
    new Punto(1, 2),
    new Punto(0, 2),
    new Punto(-1, 1),
    new Punto(-1, -1)
];

// Obtener el centroide
function calcularCentroide(puntos) {
    let sumX = 0, sumY = 0;
    puntos.forEach(p => {
        sumX += p.x;
        sumY += p.y;
    });
    return new Punto(sumX / puntos.length, sumY / puntos.length);
}

const centroid = calcularCentroide(points);

// Ordenar puntos por ángulo
function angleFromCentroid(punto) {
    return Math.atan2(punto.y - centroid.y, punto.x - centroid.x);
}

const sortedPoints = points.slice().sort((a, b) => angleFromCentroid(a) - angleFromCentroid(b));

// Ajustar escala y centrado
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width, canvasHeight = canvas.height;
const scale = 80;  // Ajusta el tamaño general del polígono
const offsetX = canvasWidth / 2;  // Centrar en el Canvas
const offsetY = canvasHeight / 2;

ctx.beginPath();
sortedPoints.forEach((p, i) => {
    const x = p.x * scale + offsetX;
    const y = p.y * scale + offsetY;
    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
});
ctx.closePath();
ctx.fillStyle = 'lightblue';
ctx.fill();
ctx.stroke();

// Verificar convexidad
function crossProduct(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

let crossProducts = [];
for (let i = 0; i < sortedPoints.length; i++) {
    let o = sortedPoints[i];
    let a = sortedPoints[(i + 1) % sortedPoints.length];
    let b = sortedPoints[(i + 2) % sortedPoints.length];
    crossProducts.push(crossProduct(o, a, b));
}

const positive = crossProducts.every(cp => cp > 0);
const negative = crossProducts.every(cp => cp < 0);

const result = positive || negative ? "Convexa" : "Cóncava";
document.getElementById("result").innerText = `La figura es ${result}.`;
