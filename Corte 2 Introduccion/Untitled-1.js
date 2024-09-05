// Función de conversión Cartesianas a Polares
function cart2polar(x, y) {
    return [Math.sqrt(x * x + y * y), Math.atan2(y, x)];
}

// Función de conversión Polares a Cartesianas
function polar2cart(r, a) {
    return [r * Math.cos(a), r * Math.sin(a)];
}

// Clases para coordenadas
class Cartesiana {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }

    toPolar() {
        let [r, a] = cart2polar(this._x, this._y);
        return new Polar(r, a);
    }
}

class Polar {
    constructor(radio, angulo) {
        this._radio = radio;
        this._angulo = angulo;
    }

    get radio() {
        return this._radio;
    }

    get angulo() {
        return this._angulo;
    }

    set radio(value) {
        this._radio = value;
    }

    set angulo(value) {
        this._angulo = value;
    }

    toCartesiana() {
        let [x, y] = polar2cart(this._radio, this._angulo);
        return new Cartesiana(x, y);
    }
}

// Rotación de un punto en coordenadas cartesianas
function rot(pxy, ar) {
    const cp = cart2polar(pxy[0], pxy[1]);
    cp[1] += ar;  // Se rota el ángulo
    return polar2cart(cp[0], cp[1]);
}

// Función para generar un polígono
function poligono(n, L, cx, cy) {
    const vertices = [];
    const a = 2 * Math.PI / n;  // Ángulo entre vértices
    const ap = L / (2 * Math.tan(a / 2));  // Apotema del polígono

    // Primer vértice en coordenadas cartesianas
    let p = [cx + L / 2, cy + ap];

    // Generación de los vértices rotados
    for (let i = 0; i < n; i++) {
        vertices.push(rot(p, i * a));
    }
    return vertices;
}

// Función para elegir entre apotema o lado y generar el polígono
function generarPoligono(opcion, valor, n, coordenadas) {
    let apotema, lado;

    if (opcion === 'apotema') {
        apotema = valor;
        lado = 2 * apotema * Math.tan(Math.PI / n);  // Lado a partir del apotema
    } else if (opcion === 'lado') {
        lado = valor;
        apotema = lado / (2 * Math.tan(Math.PI / n));  // Apotema a partir del lado
    }

    let centro;
    if (coordenadas.tipo === 'cartesiana') {
        centro = new Cartesiana(coordenadas.x, coordenadas.y);
    } else if (coordenadas.tipo === 'polar') {
        centro = new Polar(coordenadas.radio, coordenadas.angulo).toCartesiana();
    }

    const vertices = poligono(n, lado, centro.x, centro.y);
    console.log(vertices);
}

// Prueba del código
generarPoligono('apotema', 10, 8, { tipo: 'cartesiana', x: 20, y: 20 });
