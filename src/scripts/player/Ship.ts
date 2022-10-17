import { Entity } from "../../engine/core/entity/Entity";
import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Vec2 } from "../../engine/math/Vec2";
import { Runtime } from "../../engine/runtime/Runtime";
import { SpriteComponent } from "../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { Constants } from "../Constants";
import { LevelManagerController } from "../level/LevelManager";
import { PlayerControler } from "./PlayerControler";

class SpaceShipController extends ScriptComponent {
    private levelManager: LevelManagerController | undefined
    private player: Entity | undefined
    onInit = () => {
        this.levelManager = Runtime.EntityManager!.getEntity("levelmanager")!.getComponent("levelmanager") as LevelManagerController;
        this.player = Runtime.EntityManager!.getEntity("player")
    };
    onTick = () => {
        this.entity.transform = this.entity.transform.add((new Vec2(60, 0)).multiplyScalar(Runtime.deltaTime!))
        if (this.entity.transform.x > 150) {
            this.player!.transform = this.player!.transform.add((new Vec2(60, 0)).multiplyScalar(Runtime.deltaTime!))
        }
        if (this.entity.transform.x > Constants.WORLD_MAX_X + 30) {
            Runtime.SceneManager?.setScene("show_score")
        }
    };

}

export function SpaceShip(mgr: EntityManager) {
    const e = mgr.createEntity();
    const controler = new SpaceShipController();
    e.addComponent(controler)

    e.transform = new Vec2(-25, Constants.WORLD_MIN_Y + 25)

    const sprite = new SpriteComponent(Runtime!.Media?.getMedia("space_ship"));
    e.addComponent(sprite)

    return controler
}