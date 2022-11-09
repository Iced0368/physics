import {Universe} from './physics.js';
import {Vector2, diff} from './vector2.js';

const u = new Universe(60, true, true, false);

u.generate(100, 0, 30, new Vector2(200, 200), new Vector2(0, 0));
u.generate(1, -2, 10, new Vector2(300, 200), new Vector2(0, -1));
u.generate(1, 0, 5, new Vector2(250, 200), new Vector2(0, 1.4));
u.generate(1, 2, 5, new Vector2(200, 350), new Vector2(0.8, 0));

u.run();