import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { RendnerComponent } from "../../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { EnemyBullet } from "../../bullets/enemyBullet/EnemyBullet";
import { ColorPallets } from "../../Constants";

export class SquashingEnemyController extends ScriptComponent {
    constructor(path: { direction: Vec2, until: Vec2 }[]) {
        super();
        this.path = path;
    }
    private sprite: SpriteComponent | undefined;
    public ticks: number = 0;
    private path: { direction: Vec2, until: Vec2 }[];
    private pointAtPath: number = 0;
    public quickVector: Vec2 = new Vec2(200, 200);
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
    }

    onTick = () => {
        this.ticks++;
        if (this.ticks % 5 == 0) {
            this.sprite!.frame++;
            if (this.sprite!.frame == 6) {
                this.sprite!.frame = 0;
            }
        }
        const moveBy = this.quickVector.multiplyScalar(Runtime.deltaTime!)
        moveBy.x *= this.path[this.pointAtPath].direction.x;
        moveBy.y *= this.path[this.pointAtPath].direction.y;
        this.entity.transform = this.entity.transform.add(moveBy)

        if (this.pointAtPath < this.path.length - 1) {

            if (this.path[this.pointAtPath].direction.x == 1 || this.path[this.pointAtPath].direction.x == -1) {
                if (this.entity.transform.x <= this.path[this.pointAtPath].until.x) {
                    this.entity.transform = this.path[this.pointAtPath].until
                    this.pointAtPath++;
                }
            } else if (this.path[this.pointAtPath].direction.y == 1) {
                if (this.entity.transform.y >= this.path[this.pointAtPath].until.y) {
                    this.entity.transform = this.path[this.pointAtPath].until
                    this.pointAtPath++;
                }
            } else if (this.path[this.pointAtPath].direction.y == -1) {
                if (this.entity.transform.y <= this.path[this.pointAtPath].until.y) {
                    this.entity.transform = this.path[this.pointAtPath].until
                    this.pointAtPath++;
                }
            }
        }

    }
    public shot() {
        const b: Entity = EnemyBullet(Runtime.EntityManager!, this.entity, ColorPallets.GREEN);
        b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
        (b.getComponent("bulletcontroller") as BulletController)!.moveVector = new Vec2(-100, 0)
    }

}

export interface PathItem {
    direction: Vec2, until: Vec2
}