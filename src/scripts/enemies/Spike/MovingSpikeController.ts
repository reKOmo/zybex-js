import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { RendnerComponent } from "../../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { EnemyBullet } from "../../bullets/enemyBullet/EnemyBullet";
import { ColorPallets } from "../../Constants";
import { LevelInfo } from "../../level/LevelManager";

export class MovingSpikeController extends ScriptComponent {
    private sprite: SpriteComponent | undefined;
    private ticks: number = 0;
    public quickVector: Vec2 = new Vec2(-96, 26);
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
    }

    onTick = () => {
        this.ticks++;
        if (this.ticks % 3 == 0) {
            this.sprite!.frame++;
            if (this.sprite!.frame == 6) {
                this.sprite!.frame = 0;
            }
        }
        this.entity.transform = this.entity.transform.add(this.quickVector.multiplyScalar(Runtime.deltaTime!))
    }
    public shot() {
        const b: Entity = EnemyBullet(Runtime.EntityManager!, undefined);
        b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
        (b.getComponent("bulletcontroller") as BulletController)!.moveVector = new Vec2(-100, 0)
    }

}