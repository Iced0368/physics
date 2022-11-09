import * as vec2 from './vector2.js';

class Matter{
    mass: number;
    electric: number;
    radius: number;
    position: vec2.Vector2;
    velocity: vec2.Vector2;

    constructor(m: number, q: number, r: number, pos: vec2.Vector2, v: vec2.Vector2){
        this.mass = m;
        this.electric = q;
        this.radius = r;
        this.position = pos;
        this.velocity = v;
    }
}

const GRAVITY_CONSTANT: number = 1;
const COULOMB_CONSTANT: number = 1;
const REPULSIVE_CONSTANT: number = 0.4;
const REPULSIVE_RADIUS: number = 0.8;


function InteractionForce(a: Matter, b: Matter, gravity: boolean, electric: boolean, repulsive: boolean){
    const NORMAL = vec2.diff(a.position, b.position).normalize();
    const r = NORMAL[0];
    const dir = NORMAL[1];

    let FORCE = new vec2.Vector2(0, 0);

    if(gravity){ //Gravity Force
        const g_mag = -GRAVITY_CONSTANT*a.mass*b.mass/(r*r);
        FORCE.add(dir, g_mag);
    }
    if(electric){ //Electric Force
        const e_mag = COULOMB_CONSTANT*a.electric*b.electric/(r*r);
        FORCE.add(dir, e_mag);
    } 
    if(repulsive){ //Repulsive Force
        const r_mag = REPULSIVE_CONSTANT*((a.radius+b.radius)*REPULSIVE_RADIUS > r ? 1 : 0);
        FORCE.add(dir, r_mag);
    }

    return FORCE;
}



class Universe {
    matter_list : Array<Matter>;
    graphics: Array<HTMLElement>;
    gravity: boolean;
    electric: boolean;
    repulsive: boolean;
    framerate: number;

    constructor(framerate: number, gravity: boolean, electric: boolean, repulsive: boolean){
        this.matter_list = [];
        this.graphics = [];
        this.gravity = gravity;
        this.electric = electric;
        this.repulsive = repulsive;
        this.framerate = framerate;
    }

    generate(m: number, q: number, r: number, pos: vec2.Vector2, v: vec2.Vector2){
        this.matter_list.push(new Matter(m, q, r, pos, v));
        
        const graphic = document.createElement("div")
        const circle = document.createElement('div')
        graphic.appendChild(circle)

        circle.className = "circle";
        const rpx = String(r) + "px";
        const rmpx = String(-r/2) + "px";
        circle.style.width = rpx;
        circle.style.height = rpx;
        circle.style.left = rmpx;
        circle.style.top = rmpx;

        if(q != 0){
            const c = q > 0 ? "red" : "blue";
            circle.style.border = String(Math.abs(q)+1) + "px solid " + c;
        }


        circle.style.position = "absolute"
        graphic.style.position = "absolute"

        document.body.appendChild(graphic);
        this.graphics.push(graphic);
    }

    next_frame(){
        const dt = 60/this.framerate
        for(let i = 0; i < this.matter_list.length; i++)
            for(let j = i+1; j < this.matter_list.length; j++){
                const force = InteractionForce(this.matter_list[i], this.matter_list[j], this.gravity, this.electric, this.repulsive);
                
                this.matter_list[i].velocity.add(force, dt/this.matter_list[i].mass);
                this.matter_list[j].velocity.add(force, -dt/this.matter_list[j].mass);
            }

        for(let i = 0; i < this.matter_list.length; i++) {
            this.matter_list[i].position.add(this.matter_list[i].velocity, dt);
            
            this.graphics[i].style.left = String(this.matter_list[i].position.x) + "px";
            this.graphics[i].style.top = String(this.matter_list[i].position.y) + "px";
        }
    }


    run(){
        setInterval(()=>{this.next_frame()}, 1000 / this.framerate);
    }
}

export {Universe}