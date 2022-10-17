import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { RendnerComponent } from "../../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { EnemyBullet } from "../../bullets/enemyBullet/EnemyBullet";
import { ColorPallets, Constants } from "../../Constants";

export class NormalSpikeController extends ScriptComponent {
    private sprite: SpriteComponent | undefined;
    private ticks: number = 0;
    public state: number = 0;
    private quickVector: Vec2 = new Vec2(-150, 0);
    private slowVector: Vec2 = new Vec2(-250, 0);
    private timeTillShoot = 1.6;
    private timeTillGo = 0.2;
    private timePassed = 0;
    private shot: boolean = false;
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
    }

    onTick = () => {
        this.timePassed += Runtime.deltaTime!;
        this.ticks++;
        if (this.ticks % 3 == 0) {
            this.sprite!.frame++;
            if (this.sprite!.frame == 6) {
                this.sprite!.frame = 0;
            }
        }
        switch (this.state) {
            case 0:
                this.normalTick();
                break;
            case 1:
                this.shootTick();
                break;
            case 2:
                this.goTick();
                break;
        }

    }

    normalTick() {
        this.entity.transform = this.entity.transform.add(this.quickVector.multiplyScalar(Runtime.deltaTime!))
        if (Math.round(this.entity.transform.x) < Constants.WORLD_MAX_X - 20) {
            this.entity.transform.x = Constants.WORLD_MAX_X - 20
            this.state = 1;
            this.timePassed = 0;
        }
    }

    shootTick() {
        if (!this.shot && this.timePassed > this.timeTillShoot) {
            const b: Entity = EnemyBullet(Runtime.EntityManager!, this.entity, ColorPallets.GREEN);
            b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
            (b.getComponent("bulletcontroller") as BulletController)!.moveVector = new Vec2(-180, 0)
            this.shot = true;
            this.timePassed = 0;
        }
        if (this.shot && this.timePassed > this.timeTillGo) {
            this.state = 2;
        }
    }

    goTick() {
        this.entity.transform = this.entity.transform.add(this.slowVector.multiplyScalar(Runtime.deltaTime!))
    }

}