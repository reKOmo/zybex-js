import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { Constants } from "../../Constants";
import { BlockBaseController } from "./BlockBaseController";

export class BlockStair extends BlockBaseController {
    constructor() {
        super("stairblock")
    }

    private moveHori: Vec2 = new Vec2(13, 0);
    private moveVetic: Vec2 = new Vec2(0, -15);
    private moveDuration: number = 0.13;
    private timePassed: number = 0;
    private going: boolean = false;
    private goingTop: boolean = true;

    onTick = () => {
        if (this.going) {
            this.timePassed += Runtime.deltaTime!;
            if (this.goingTop) {
                const fr = Runtime.deltaTime! / this.moveDuration;
                this.entity.transform = this.entity.transform.add(this.moveHori.multiplyScalar(fr));
                if (this.timePassed >= this.moveDuration) {
                    this.timePassed = 0;
                    this.goingTop = false;
                }
            } else {
                const fr = Runtime.deltaTime! / this.moveDuration;
                this.entity.transform = this.entity.transform.add(this.moveVetic.multiplyScalar(fr));
                if (this.timePassed >= this.moveDuration) {
                    this.timePassed = 0;
                    this.goingTop = true;
                }
            }

        }

        if (this.entity.transform.y < Constants.WORLD_MIN_Y - 2) {
            this.entity.addTag("dead")
        }

    }

    go = () => {
        this.going = true;
        this.goingTop = true;
    };
}