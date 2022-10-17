import { Entity } from "../../../engine/core/entity/Entity";
import { randomNumberInRange } from "../../../engine/math/utils";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { RendnerComponent } from "../../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { EnemyBullet } from "../../bullets/enemyBullet/EnemyBullet";
import { ColorPallets, Constants } from "../../Constants";

export class MovingDiskController extends ScriptComponent {
    //-140 0
    public moveVector: Vec2 = new Vec2(-Constants.WORLD_SPEED, 0)
    public canShoot: boolean = true;
    private ticks: number = 0;
    private sprite: SpriteComponent | undefined;
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
    };

    onTick = () => {
        this.ticks++;
        if (this.ticks % 5 == 0) {
            this.sprite!.frame++;
            if (this.sprite!.frame == 6) {
                this.sprite!.frame = 0;
            }
        }
        this.entity.transform = this.entity.transform.add(this.moveVector.multiplyScalar(Runtime.deltaTime!));
        if (this.canShoot) {
            this.shoot()
        }
        this.timePassed += Runtime.deltaTime!
    };

    timePassed: number = 0;
    breakTime: number = 0;
    longBreak: boolean = Boolean(Math.round(Math.random()));

    shoot() {
        const longBreak = 4 * randomNumberInRange(0.8, 1.1);
        const shortBreak = 1.5 * randomNumberInRange(0.8, 1.1);


        if (this.timePassed > this.breakTime) {
            const b: Entity = EnemyBullet(Runtime.EntityManager!, undefined);
            b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
            (b.getComponent("bulletcontroller") as BulletController)!.moveVector = new Vec2(-180, 0)

            this.timePassed = 0;
            if (this.longBreak) {
                this.breakTime = longBreak;
            } else {
                this.breakTime = shortBreak
            }
            this.longBreak = !this.longBreak;
        }
    }

}