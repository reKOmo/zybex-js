import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { Constants } from "../../Constants";
import { BlockBaseController } from "./BlockBaseController";

export class BlockDiagnal extends BlockBaseController {
    constructor() {
        super("diagblock")
    }

    private moveVector: Vec2 = new Vec2(8, 10);
    private moveDuration: number = 0.1;
    private waitDuration: number = 0.2;
    private timePassed: number = 0;
    private going: boolean = false;
    private isMoving: boolean = false;

    onTick = () => {
        if (this.going) {
            this.timePassed += Runtime.deltaTime!;
            if (this.isMoving) {
                const fr = Runtime.deltaTime! / this.moveDuration;
                this.entity.transform = this.entity.transform.add(this.moveVector.multiplyScalar(fr));
                if (this.timePassed >= this.moveDuration) {
                    this.timePassed = 0;
                    this.isMoving = false;
                }
            } else {
                if (this.timePassed >= this.waitDuration) {
                    this.timePassed = 0;
                    this.isMoving = true;
                }
            }

        }

        if (this.entity.transform.y > Constants.WORLD_MAX_Y - 20) {
            this.entity.addTag("dead")
        }

    }

    go = () => {
        this.going = true;
        this.isMoving = true;
    };
}