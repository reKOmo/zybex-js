import { Entity } from "../../../engine/core/entity/Entity";
import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { EnemyBullet } from "../../bullets/enemyBullet/EnemyBullet";
import { AutoGun } from "../../bullets/AutoGun";
import { ColorPallets, Constants } from "../../Constants";
import { BasicEnemyController } from "../BasicEnemyController";
import { WormBody } from "./WormBody";
import { WormController } from "./WormController";
import { LevelInfo } from "../../level/LevelManager";
import { Items } from "../../item/Items";
import { Gun } from "../../bullets/Gun";

export function createWormBody(mgr: EntityManager, bodyPart: number): Entity {
    const d = mgr.createEntity();

    const sprite = new SpriteComponent(Runtime.Media?.getMedia("wormSprite"), 18, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    sprite.frame = bodyPart
    d.addComponent(sprite)

    const colider = new SquareColider(18, 20);
    d.addComponent(colider)

    const controler = new WormBody();
    d.addComponent(controler)

    const gun = new AutoGun((mgr, owner: Gun) => { return EnemyBullet(mgr, owner) });
    gun.maxBullets = 1;
    gun.bulletVector = new Vec2(-180, 0)
    d.addComponent(gun)


    const bcont = new BasicEnemyController();
    bcont.manageDeath = false
    d.addComponent(bcont)
    return d;
}

export function Worm(mgr: EntityManager, itemsToDrop?: Items[]) {
    const d = mgr.createEntity();

    d.transform.x = Constants.WORLD_MAX_X;
    d.transform.y = Constants.WORLD_MIN_Y + 20

    const controler = new WormController();
    controler.itemsToDrop = itemsToDrop
    d.addComponent(controler)

    return d;
}