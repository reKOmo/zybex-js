import { Entity } from "../../../engine/core/entity/Entity";
import { randomNumberInRange } from "../../../engine/math/utils";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { Colider } from "../../../engine/systems/colision/Colider";
import { RendnerComponent } from "../../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { EnemyBullet } from "../../bullets/enemyBullet/EnemyBullet";
import { ColorPallets, Constants } from "../../Constants";
import { LevelInfo } from "../../level/LevelManager";

export class ShootingDiskController extends ScriptComponent {
    private sprite: SpriteComponent | undefined;
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
    };

    onTick = () => {
        this.timePassed += Runtime.deltaTime!;
        this.entity.transform = this.entity.transform.add((new Vec2(-Constants.WORLD_SPEED, 0)).multiplyScalar(Runtime.deltaTime!))
        this.shoot();
    };

    timePassed: number = 0;
    public breakTime: number = 0;

    shoot() {
        const shortBreak = 4


        if (this.timePassed > this.breakTime) {
            const b: Entity = EnemyBullet(Runtime.EntityManager!, this.entity, Runtime.GlobalStorage.get(LevelInfo.PALLET));
            b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
            (b.getComponent("bulletcontroller") as BulletController)!.moveVector = new Vec2(-180, 0)

            this.timePassed = 0;
            this.breakTime = shortBreak
        }
    }

    onCollision = (colider: Colider) => {
        if (colider.entity.hasTag("player_bullet")) {
            this.sprite!.frame++;
            if (this.sprite!.frame == 6) {
                this.sprite!.frame = 0;
            }
        }
    };

}