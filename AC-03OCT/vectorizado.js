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

// Calcular centroide
function calcularCentroide(puntos) {
    let sumX = 0, sumY = 0;
    puntos.forEach(p => {
        sumX += p.x;
        sumY += p.y;
    });
    return new Punto(sumX / puntos.length, sumY / puntos.length);
}

const centroid = calcularCentroide(points);

// Ordenar puntos por ángulo respecto al centroide
function angleFromCentroid(punto) {
    return Math.atan2(punto.y - centroid.y, punto.x - centroid.x);
}

const sortedPoints = points.slice().sort((a, b) => angleFromCentroid(a) - angleFromCentroid(b));

// Ajustar el factor de escala y centrado para que encaje en el SVG
const svgWidth = 400, svgHeight = 400;
const scale = 80;  // Ajusta el tamaño general del polígono
const offsetX = svgWidth / 2;  // Centrar en el SVG
const offsetY = svgHeight / 2;

// Trazar el polígono usando SVG
const svg = document.getElementById("polygon");
let polygonPoints = sortedPoints.map(p => `${p.x * scale + offsetX},${p.y * scale + offsetY}`).join(" ");
const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
polygon.setAttribute("points", polygonPoints);
polygon.setAttribute("style", "fill:lightblue;stroke:black;stroke-width:2");
svg.appendChild(polygon);

// Función para calcular producto cruzado
function crossProduct(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

// Verificar convexidad
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
