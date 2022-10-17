import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { Constants } from "../../Constants";
import { Items } from "../../item/Items";
import { LevelManagerController } from "../../level/LevelManager";
import { BasicEnemyController } from "../BasicEnemyController";
import { createWormBody } from "./Worm";
import { WormBody } from "./WormBody";

export class WormController extends ScriptComponent {
    private bodyParts: WormBody[] = [];
    private bodyControllers: BasicEnemyController[] = [];
    public bodyPartsAlive: number = 6;
    private state: number = 0;
    private levelManager: LevelManagerController | undefined;
    public itemsToDrop: Items[] | undefined
    onInit = () => {
        this.levelManager = Runtime.EntityManager!.getEntity("levelmanager")!.getComponent("levelmanager") as LevelManagerController;
        this.levelManager.enemiesAlive++;
        const size = 6;
        let off = WormBody.duration / 4;
        for (let i = 0; i < size; i++) {
            let bodyPart = 1;
            if (i == 0) bodyPart = 0;
            if (i == 5) bodyPart = 2;
            let part = createWormBody(Runtime.EntityManager!, bodyPart)
            let partController = part.getComponent("wromBody") as WormBody;
            let partBasicCont = part.getComponent("basicEnemyController") as BasicEnemyController;
            if (this.itemsToDrop) {
                let diff = 6 - this.itemsToDrop.length;
                if (diff + this.itemsToDrop.length > i) {
                    partBasicCont.itemToDrop = this.itemsToDrop[i - diff];
                }
            }
            partController.enabled = false

            partController.timePassed = off - Runtime.deltaTime!;
            off += partController.duration / size / 2;

            partController.onTick();
            partController.enabled = false;

            part.transform.y += i * 16;
            part.transform.x += 4


            this.bodyParts.push(partController)
            this.bodyControllers.push(partBasicCont)
            this.entity.addChild(part)
        }
    }
    onTick = () => {
        switch (this.state) {
            case 0:
                this.entity.transform = this.entity.transform.add((new Vec2(-Constants.WORLD_SPEED * 1.5, 0)).multiplyScalar(Runtime.deltaTime!))
                break;
            case 1:
                this.entity.transform = this.entity.transform.add((new Vec2(-Constants.WORLD_SPEED / 3, 0)).multiplyScalar(Runtime.deltaTime!))
                break
        }


        if (this.entity.transform.x <= Constants.WORLD_MAX_X - 20) {
            for (let i = this.bodyParts.length - 1; i >= 0; i--) {
                this.bodyParts[i].enabled = true
                this.bodyControllers[i].enabled = true;
            }
            this.state = 1;
        }


        for (let i = this.bodyParts.length - 1; i >= 0; i--) {
            if (this.bodyParts[i].entity.hasTag("dead")) {
                this.bodyPartsAlive--;
                this.bodyParts[i].entity.deleteSelf();
                this.bodyParts.splice(i, 1)
            }
        }

        if (this.bodyPartsAlive == 0 || this.entity.transform.x <= 0) {
            this.levelManager!.enemiesAlive--;
            for (let i = this.bodyParts.length - 1; i >= 0; i--) {
                this.bodyParts[i].entity.deleteSelf();

            }
            this.entity.deleteSelf();
        }
    }

}