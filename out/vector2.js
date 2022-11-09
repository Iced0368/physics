class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    norm2() { return this.x * this.x + this.y * this.y; }
    norm() { return Math.sqrt(this.norm2()); }
    normalized() { return mult(this, 1 / this.norm()); }
    normalize() {
        const _norm = this.norm();
        return [_norm, div(this, _norm)];
    }
    add(v, k = 1) { this.x += k * v.x; this.y += k * v.y; }
    div(n) { this.x /= n; this.y /= n; }
}
function sum(v1, v2) { return new Vector2(v1.x + v2.x, v1.y + v2.y); }
function diff(v1, v2) { return new Vector2(v1.x - v2.x, v1.y - v2.y); }
function dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function mult(v, n) { return new Vector2(n * v.x, n * v.y); }
function div(v, n) { return new Vector2(v.x / n, v.y / n); }
export { Vector2, sum, diff, dot, mult, div };
