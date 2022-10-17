import { Vec2 } from "../../engine/math/Vec2";
import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { Constants } from "../Constants";

export class ItemController extends ScriptComponent {
    private moveVector: Vec2 = new Vec2(-Constants.WORLD_SPEED, 0)
    onInit = () => {

    };
    onTick = () => {
        this.entity.transform = this.entity.transform.add(this.moveVector.multiplyScalar(Runtime.deltaTime!));
        if (this.entity.transform.x <= 0) {
            this.entity.deleteSelf();
        }
    };

    onCollision = (colider: Colider) => {
        if (colider.entity.name == "player") {
            this.entity.deleteSelf();
        }
    };

}