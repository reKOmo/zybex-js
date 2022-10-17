import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../../bullets/BulletControler";
import { Gun } from "../../bullets/Gun";
import { LevelInfo } from "../../level/LevelManager";


export class PulseGun extends ScriptComponent implements Gun {
    constructor() {
        super("pgun")
    }

    public maxBullets: number = 1;
    public bulletVector: Vec2 = new Vec2(300, 0);
    public timeBetweenBullets: number = 0;
    public offset: Vec2 = new Vec2(3, 3)
    private shooting: boolean = false;
    public bulletsAlive: number = 0;
    private timePassed: number = 0;
    private _level = 0;
    private maxLevel = 3;

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
                if (this.level == 1) {
                    this.createShortBullet()
                } else {
                    this.createBullet();
                }
                if (this._level == 3) {
                    this.createAddBullet(1);
                    this.createAddBullet(-1);
                }
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

    private createShortBullet() {
        const bullet = Runtime.EntityManager!.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone()
        bullet.transform.x += 5;

        const controller = new BulletController(this);
        controller.moveVector = this.bulletVector.clone()
        bullet.addComponent(controller);
        controller.ownerType = "player"
        controller.damage = this._level;
        const sprite = new SpriteComponent(Runtime.Media?.getMedia("player_bullet_pulse_short"));
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        bullet.addComponent(sprite)
        const colider = new SquareColider(8, 14);
        bullet.addComponent(colider)
    }

    private createBullet() {
        const bullet = Runtime.EntityManager!.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone()
        bullet.transform.x += 5;
        bullet.transform.y -= 8;
        const controller = new BulletController(this);
        controller.ownerType = "player"
        controller.moveVector = this.bulletVector.clone()
        bullet.addComponent(controller);
        controller.damage = this._level;
        const sprite = new SpriteComponent(Runtime.Media?.getMedia("player_bullet_pulse"));
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        bullet.addComponent(sprite)
        const colider = new SquareColider(8, 32);
        bullet.addComponent(colider)
    }

    private createAddBullet(dir: number) {
        const bullet = Runtime.EntityManager!.createEntity();
        bullet.addTag("player_bullet");
        bullet.transform = this.entity.transform.clone()
        bullet.transform.x += 5;
        bullet.transform.y += 5;
        const controller = new BulletController(this);
        controller.moveVector = new Vec2(212, 212 * dir);
        controller.ownerType = "player"
        controller.takeAmmo = false
        bullet.addComponent(controller);
        controller.damage = 1;
        const sprite = new SpriteComponent(Runtime.Media?.getMedia("player_bullet_basic"));
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        bullet.addComponent(sprite)
        const colider = new SquareColider(8, 8);
        bullet.addComponent(colider)
    }

}