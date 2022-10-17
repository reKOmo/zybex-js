import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { Gun } from "../../bullets/Gun";
import { LevelInfo } from "../../level/LevelManager";


export class RailGun extends ScriptComponent implements Gun {
    constructor() {
        super("rgun")
    }

    public maxBullets: number = 1;
    public bulletVector: Vec2 = new Vec2(200, 0);
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
        if (this.shooting) {
            if (this.timePassed > this.timeBetweenBullets) {
                this.createBullet();
                this.bulletsAlive += this._level;
                this.timePassed = 0;
            }
            if (this.bulletsAlive === this._level) {
                this.shooting = false;
                this.timePassed = 0;
            }
        }

        if (this.bulletsAlive === 0) {
            this.shooting = true;
            this.timePassed = this.timeBetweenBullets;
        }
    }

    private createBullet() {
        for (let i = 0; i < this._level; i++) {
            const bullet = Runtime.EntityManager!.createEntity();
            bullet.addTag("player_bullet");
            bullet.transform = this.entity.transform.clone()
            bullet.transform.x += i * 16 + 5;
            bullet.transform.y += 5;
            const controller = new BulletController(this);
            controller.moveVector = this.bulletVector.clone()
            controller.ownerType = "player"
            controller.dieOnContact = false
            bullet.addComponent(controller);
            controller.damage = 2 * this._level;
            const sprite = new SpriteComponent(Runtime.Media?.getMedia("player_bullet_railgun"));
            sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
            bullet.addComponent(sprite)
            const colider = new SquareColider(16, 8);
            bullet.addComponent(colider)
        }
    }

}