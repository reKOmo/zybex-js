import { Colider } from "./Colider";

export class SquareColider extends Colider {
    constructor(w: number, h: number) {
        super();
        this.w = w;
        this.h = h;
    }

    public w: number;
    public h: number;

    get x(): number {
        return this.entity.absoluteTransform.x;
    }
    get x1(): number {
        return this.entity.absoluteTransform.x + this.w;
    }

    get y(): number {
        return this.entity.absoluteTransform.y;
    }
    get y1(): number {
        return this.entity.absoluteTransform.y + this.h;
    }

    isOverlapping = (colider: SquareColider): boolean => {
        return (
            this.x1 > colider.x &&
            this.x < colider.x1 &&
            this.y < colider.y1 &&
            this.y1 > colider.y
        )
    }

}