import { Entity } from "../../engine/core/entity/Entity";
import { Vec2 } from "../../engine/math/Vec2";
import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { Constants } from "../Constants";
import { PlayerControler } from "../player/PlayerControler";
import { AutoGun } from "./AutoGun";
import { Gun } from "./Gun";

export class BulletController extends ScriptComponent {
    constructor(owner: Gun | undefined) {
        super("bulletcontroller")
        this.gun = owner;
    }
    public moveVector: Vec2 = new Vec2(250, 0)
    private gun: Gun | undefined;
    public damage: number = 1;
    public takeAmmo: boolean = true;
    public dieOnContact: boolean = true;
    public ownerType: string = "enemy"

    onInit = () => {

    };

    onTick = () => {
        this.entity.transform = this.entity.transform.add(this.moveVector.multiplyScalar(Runtime.deltaTime!))
        if (this.entity.transform.x > Runtime.Project?.resolution.x! + 10 || this.entity.transform.x < -10 || this.entity.transform.y <= Constants.WORLD_MIN_Y || this.entity.transform.y >= Constants.WORLD_MAX_Y) {
            if (this.gun && this.takeAmmo) this.gun.bulletsAlive--;
            this.entity.deleteSelf();
        }
    };

    onCollision = (colider: Colider) => {
        if (this.dieOnContact) {
            if ((colider.entity.name == "player" && this.ownerType == "enemy") || (colider.entity.hasTag("enemy") && this.ownerType == "player")) {
                if (this.gun && this.takeAmmo) this.gun.bulletsAlive--;
                this.entity.deleteSelf();
            }
        }
    };

}