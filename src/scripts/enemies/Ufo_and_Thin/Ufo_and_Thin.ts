import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ColorPallets, Constants } from "../../Constants";
import { Items } from "../../item/Items";
import { LevelInfo } from "../../level/LevelManager";
import { BasicEnemyController } from "../BasicEnemyController";
import { UfoController } from "./UfoController";

export function Ufo(mgr: EntityManager, reverse: number, item: Items | undefined) {
    const d = mgr.createEntity();

    const sprite = new SpriteComponent(Runtime.Media?.getMedia("ufoSprite"), 16, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    d.addComponent(sprite)

    const colider = new SquareColider(25, 25);
    d.addComponent(colider)

    const controler = new UfoController(reverse);
    d.addComponent(controler)


    const bcont = new BasicEnemyController();
    bcont.maxHealth = 1
    bcont.itemToDrop = item
    d.addComponent(bcont)
    return d;
}

export function UfoBunch(mgr: EntityManager, itemsToDrop?: Items[]) {
    let total = 0;
    for (let i = 0; i < 3; i++) {
        total++
        let item = undefined
        if (itemsToDrop) {
            let diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > total) {
                item = itemsToDrop[total - diff];
            }
        }
        const e = Ufo(mgr, 1, item);
        e.transform.y = (Runtime.Project?.resolution.y! / 2) + 10
        e.transform.x = Constants.WORLD_MAX_X + 16 * i;
    }
    for (let i = 0; i < 3; i++) {
        total++
        let item = undefined
        if (itemsToDrop) {
            let diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > total) {
                item = itemsToDrop[total - diff];
            }
        }
        const e = Ufo(mgr, -1, item);
        e.transform.y = (Runtime.Project?.resolution.y! / 2) - 10
        e.transform.x = Constants.WORLD_MAX_X + 16 * i;
    }
}

export function Thin(mgr: EntityManager, reverse: number, maxOff: number) {
    const d = mgr.createEntity();

    const sprite = new SpriteComponent(Runtime.Media?.getMedia("thinSprite"), 16, 20);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    d.addComponent(sprite)

    const colider = new SquareColider(16, 20);
    d.addComponent(colider)

    const controler = new UfoController(reverse);
    controler.maxOffset = maxOff;
    d.addComponent(controler)


    const bcont = new BasicEnemyController();
    bcont.maxHealth = 3
    d.addComponent(bcont)
    return d;
}

export function ThinBunch(mgr: EntityManager) {
    for (let i = 0; i < 6; i++) {
        const e = Thin(mgr, -1, 50);
        e.transform.y = (Runtime.Project?.resolution.y! / 2)
        e.transform.x = Constants.WORLD_MAX_X + 16 * i;
    }
}

export function ThinBunch2(mgr: EntityManager) {
    const off = 20;
    for (let i = 0; i < 5; i++) {
        const e = Thin(mgr, -1, off);
        e.transform.y = (Runtime.Project?.resolution.y! / 2) + off
        e.transform.x = 160 + 8 * i;
    }
    for (let i = 0; i < 5; i++) {
        const e = Thin(mgr, 1, off);
        e.transform.y = (Runtime.Project?.resolution.y! / 2) - off
        e.transform.x = 160 + 8 * i;
    }
}