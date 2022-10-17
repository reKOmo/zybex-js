import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { EnemyBullet } from "../../bullets/enemyBullet/EnemyBullet";
import { ColorPallets } from "../../Constants";

export class WormBody extends ScriptComponent {
    constructor() {
        super("wromBody")
    }
    static readonly maxOffset = 15
    public timePassed: number = 0;
    public readonly duration: number = 0.6;
    static duration: number = 0.45

    onInit = () => {

    };
    onTick = () => {
        this.timePassed += Runtime.deltaTime!;
        const t = (Math.round(this.timePassed * 1000000) % (this.duration * 1000000)) / 1000000;
        const angle = 2 * Math.PI * (t / this.duration);

        this.entity.transform.x = WormBody.maxOffset * Math.sin(angle)
    };

    // public shot() {
    //     const b: Entity = EnemyBullet(Runtime.EntityManager!, this.entity, ColorPallets.GREEN);
    //     b.transform = this.entity.transform.clone().add(new Vec2(3, 3));
    //     (b.getComponent("bulletcontroller") as BulletController)!.moveVector = new Vec2(-100, 0)
    // }

}