import { Entity } from "../../engine/core/entity/Entity";
import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Vec2 } from "../../engine/math/Vec2";
import { Runtime } from "../../engine/runtime/Runtime";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { ColorPallets } from "../Constants";
import { LevelInfo } from "../level/LevelManager";
import { BulletController } from "./BulletControler";
import { EnemyBullet } from "./enemyBullet/EnemyBullet";
import { Gun } from "./Gun";

export class AutoGun extends ScriptComponent implements Gun {
    constructor(crateBullet: (mgr: EntityManager, owner: Gun) => Entity) {
        super("gun")
        this.createBullet = crateBullet;
    }

    public maxBullets: number = 0;
    public bulletVector: Vec2 = new Vec2(150, 0);
    public timeBetweenBullets: number = 0;
    public offset: Vec2 = new Vec2(3, 3)
    private createBullet: (...args: any) => Entity;
    private shooting: boolean = false;
    public bulletsAlive: number = 0;
    private timePassed: number = 0;

    onInit = () => {

    };
    onTick = () => {
        this.timePassed += Runtime.deltaTime!
        this.shoot();
    };

    private shoot() {
        if (this.shooting) {
            if (this.timePassed > this.timeBetweenBullets) {
                const b: Entity = this.createBullet(Runtime.EntityManager!, this, Runtime.GlobalStorage.get(LevelInfo.PALLET));
                b.transform = this.entity.absoluteTransform.add(new Vec2(0, 5));
                (b.getComponent("bulletcontroller") as BulletController)!.moveVector = this.bulletVector.clone();
                this.bulletsAlive++;
                this.timePassed = 0;
            }
            if (this.bulletsAlive === this.maxBullets) {
                this.shooting = false;
                this.timePassed = 0;
            }
        }

        if (this.bulletsAlive === 0) {
            this.shooting = true;
            this.timePassed = this.timeBetweenBullets;
        }
    }

}