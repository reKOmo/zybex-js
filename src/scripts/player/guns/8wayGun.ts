import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { Gun } from "../../bullets/Gun";
import { LevelInfo } from "../../level/LevelManager";


export class EwGun extends ScriptComponent implements Gun {
    constructor() {
        super("ewgun")
    }

    public maxBullets: number = 1;
    public bulletVector: Vec2 = new Vec2(300, 0);
    public timeBetweenBullets: number = 0;
    public offset: Vec2 = new Vec2(3, 3)
    private shooting: boolean = false;
    public bulletsAlive: number = 0;
    private timePassed: number = 0;
    private _level = 0;
    private maxLevel = 4;

    get level() {
        return this._level;
    }

    set level(l: number) {
        if (l <= this.maxLevel) this._level = l;
    }

    onInit = () => {

    };
    onTick = () => {
        this.timePassed += Runtime.deltaTime!
        this.shoot();
    };

    private shoot() {
        const shootVectors = [
            [new Vec2(0, 400), new Vec2(0, -400)],
            [new Vec2(0, 400), new Vec2(0, -400), new Vec2(400, 0), new Vec2(-400, 0)],
            [new Vec2(212, 212), new Vec2(212, -212), new Vec2(-212, 212), new Vec2(-212, -212), new Vec2(400, 0), new Vec2(-400, 0)],
            [new Vec2(212, 212), new Vec2(212, -212), new Vec2(-212, 212), new Vec2(-212, -212), new Vec2(0, 400), new Vec2(0, -400), new Vec2(400, 0), new Vec2(-400, 0)],
        ]
        if (this.shooting) {
            if (this.timePassed > this.timeBetweenBullets) {
                for (let i = 0; i < this._level * 2; i++) {
                    const c = this.createAddBullet();
                    c.moveVector = shootVectors[this._level - 1][i];
                    this.bulletsAlive++;

                }
                this.timePassed = 0;
            }
            if (this.bulletsAlive === this._level * 2) {
                this.shooting = false;
                this.timePassed = 0;
            }
        }

        if (this.bulletsAlive === 0) {
            this.shooting = true;
            this.timePassed = this.timeBetweenBullets;
        }
    }

    private createAddBullet() {
        const bullet = Runtime.EntityManager!.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone()
        bullet.transform.x += 5;
        bullet.transform.y += 5;
        const controller = new BulletController(this);
        controller.ownerType = "player"
        bullet.addComponent(controller);
        controller.damage = 1;
        const sprite = new SpriteComponent(Runtime.Media?.getMedia("player_bullet_basic"), 6, 6, 8, 8);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        bullet.addComponent(sprite)
        const colider = new SquareColider(6, 6);
        bullet.addComponent(colider)

        return controller;
    }

}