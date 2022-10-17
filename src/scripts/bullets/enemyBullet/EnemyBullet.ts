import { Entity } from "../../../engine/core/entity/Entity";
import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { ColorPallet } from "../../../engine/systems/renderer/ColorPallet";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { LevelInfo } from "../../level/LevelManager";
import { BulletController } from "../BulletControler";
import { Gun } from "../Gun";

export function EnemyBullet(mgr: EntityManager, owner: Gun | undefined) {
    const bullet = mgr.createEntity();
    bullet.addTag("enemy_bullet")
    const controller = new BulletController(owner);
    bullet.addComponent(controller);
    const sprite = new SpriteComponent(Runtime.Media?.getMedia("enemyBasicBullet"), 8, 6);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET));
    bullet.addComponent(sprite)
    const colider = new SquareColider(8, 6);
    bullet.addComponent(colider)

    return bullet
}