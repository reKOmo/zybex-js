import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { BasicEnemyController } from "../BasicEnemyController";
import { PathItem, SquashingEnemyController } from "./SquashingEnemyController";
import { Constants } from "../../Constants"
import { LevelInfo } from "../../level/LevelManager";

const path: PathItem[] = [
    { direction: new Vec2(-1, 0), until: new Vec2(140, 50) },
    { direction: new Vec2(0, 1), until: new Vec2(140, 100) },
    { direction: new Vec2(-1, 0), until: new Vec2(100, 100) },
    { direction: new Vec2(0, -1), until: new Vec2(100, 40) },
    { direction: new Vec2(-1, 0), until: new Vec2(0, 40) },
]

export function SquashingBunch(mgr: EntityManager, yLevel: number) {
    for (let i = 0; i < 6; i++) {
        const e = Squashing(mgr, i);
        e.transform.x += 20 * i;
        e.transform.y = yLevel;
    }
}

export function Squashing(mgr: EntityManager, ticks: number) {
    const d = mgr.createEntity();

    d.transform.x = Constants.WORLD_MAX_X

    const sprite = new SpriteComponent(Runtime.Media?.getMedia("squashingSprite"), 16, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    sprite.frame = ticks
    d.addComponent(sprite)

    const colider = new SquareColider(16, 16);
    d.addComponent(colider)

    const controler = new SquashingEnemyController(path);
    controler.ticks = ticks
    d.addComponent(controler)


    const bcont = new BasicEnemyController();
    d.addComponent(bcont)
    return d;
}