class Vector2{
    x : number;
    y : number;
    constructor(x:number, y:number){
        this.x = x; this.y = y;
    }
    norm2(): number { return this.x*this.x + this.y*this.y; }
    norm(): number { return Math.sqrt(this.norm2()) }
    normalized() { return mult(this, 1/this.norm()); }
    normalize(): [number, Vector2] { 
        const _norm = this.norm();
        return [_norm, div(this, _norm)];
    }

    add(v: Vector2, k: number = 1) { this.x += k*v.x; this.y += k*v.y; }
    div(n: number) { this.x /= n; this.y /= n; }
}

function sum(v1: Vector2, v2: Vector2) { return new Vector2(v1.x+v2.x, v1.y+v2.y); }
function diff(v1: Vector2, v2: Vector2) { return new Vector2(v1.x-v2.x, v1.y-v2.y); }
function dot(v1: Vector2, v2: Vector2) { return v1.x*v2.x + v1.y*v2.y; }
function mult(v: Vector2, n: number) { return new Vector2(n*v.x, n*v.y); }
function div(v: Vector2, n: number) { return new Vector2(v.x/n, v.y/n); }


export {Vector2, sum, diff, dot, mult, div};