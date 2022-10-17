export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    x: number;
    y: number;


    add(v: Vec2): Vec2 {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    opposite(): Vec2 {
        return new Vec2(-this.x, -this.y);
    }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    multiplyScalar(scalar: number): Vec2 {
        return new Vec2(this.x * scalar, this.y * scalar)
    }

    dotProduct(v: Vec2): number {
        return this.x * v.x + this.y * v.y
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }
}