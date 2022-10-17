import { EntityManager } from "../../engine/core/entity/EntityManager";
import { BulletController } from "./BulletControler";

import { RendnerComponent } from "../../engine/systems/renderer/RenderComponent";
import { Entity } from "../../engine/core/entity/Entity";
import { SquareColider } from "../../engine/systems/colision/SquareColider";
import { Vec2 } from "../../engine/math/Vec2";
import { SpriteComponent } from "../../engine/systems/renderer/SpriteComponent";
import { Runtime } from "../../engine/runtime/Runtime";
import { LevelInfo } from "../level/LevelManager";
import { Gun } from "./Gun";

export function BasicBullet(mgr: EntityManager, owner: Gun): Entity {
    const bullet = mgr.createEntity();
    bullet.addTag("player_bullet");
    const controller = new BulletController(owner);
    controller.ownerType = "player"
    controller.moveVector = new Vec2(-180, 0)
    bullet.addComponent(controller);
    const sprite = new SpriteComponent(Runtime.Media?.getMedia("player_bullet_basic"));
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    bullet.addComponent(sprite)
    const colider = new SquareColider(4, 4);
    bullet.addComponent(colider)

    return bullet

}