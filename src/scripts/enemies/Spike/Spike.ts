import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ColorPallets, Constants } from "../../Constants";
import { Items } from "../../item/Items";
import { LevelInfo } from "../../level/LevelManager";
import { BasicEnemyController } from "../BasicEnemyController";
import { NormalSpikeController } from "./BasicSpikeController";
import { MovingSpikeController } from "./MovingSpikeController";

export function NormalSpike(mgr: EntityManager) {
    const offsetMap = [200, 120, 40, 0, 80, 160]
    for (let i = 0; i < 6; i++) {
        console.log("sumon")
        const d = mgr.createEntity();

        d.transform.y = Constants.WORLD_MIN_Y + 20 * i;
        d.transform.x = Constants.WORLD_MAX_X + offsetMap[i];

        const sprite = new SpriteComponent(Runtime.Media?.getMedia("spikeSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        d.addComponent(sprite)

        const colider = new SquareColider(16, 16);
        d.addComponent(colider)

        const controler = new NormalSpikeController();
        d.addComponent(controler)


        const bcont = new BasicEnemyController();
        bcont.maxHealth = 4;
        d.addComponent(bcont)
    }
}

export function MovingSpike(mgr: EntityManager, straight: boolean = true, itemsToDrop?: Items[]) {
    const offsetYTable = [0, 9, 30, 40, 60, 70]
    const offsetXTable = [0, 9, 40, 140, 140, 100]
    for (let i = 0; i < 6; i++) {
        const d = mgr.createEntity();
        //FIX OFFSET
        d.transform.y = Constants.WORLD_MIN_Y + 40 + offsetYTable[i];
        d.transform.x = Constants.WORLD_MAX_X + offsetXTable[i];

        const sprite = new SpriteComponent(Runtime.Media?.getMedia("spikeSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        d.addComponent(sprite)

        const colider = new SquareColider(18, 18);
        d.addComponent(colider)

        const controler = new MovingSpikeController();
        if (straight) controler.quickVector = new Vec2(-240, 0)
        d.addComponent(controler)


        const bcont = new BasicEnemyController();
        if (itemsToDrop) {
            let diff = 6 - itemsToDrop.length;
            if (diff + itemsToDrop.length > i) {
                bcont.itemToDrop = itemsToDrop[i - diff];
            }
        }
        d.addComponent(bcont)

    }
}

export function MovingSpikeAngle(mgr: EntityManager) {
    const d = mgr.createEntity();

    d.transform.y = 100;
    d.transform.x = 170;

    const sprite = new SpriteComponent(Runtime.Media?.getMedia("spikeSprite"), 18, 18);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    d.addComponent(sprite)

    const colider = new SquareColider(16, 16);
    d.addComponent(colider)

    const controler = new MovingSpikeController();
    d.addComponent(controler)


    const bcont = new BasicEnemyController();
    d.addComponent(bcont)

    return d;
}