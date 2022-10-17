import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { randomNumberInRange } from "../../../engine/math/utils";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ColorPallets, Constants } from "../../Constants";
import { Items } from "../../item/Items";
import { LevelInfo } from "../../level/LevelManager";
import { BasicEnemyController } from "../BasicEnemyController";
import { MovingDiskController } from "./MovingDiskController";
import { ShootingDiskController } from "./ShootingDiskControler";

export function StationaryDiskWall(mgr: EntityManager, itemsToDrop?: Items[]) {
    const timeOffsets = [0.6, 0.9, 1.2, 0.9, 0.6, 0.3]
    for (let i = 0; i < 6; i++) {
        const d = mgr.createEntity();

        d.transform.y = Constants.WORLD_MIN_Y + 14 + i * 24;
        d.transform.x = Constants.WORLD_MAX_X;

        const sprite = new SpriteComponent(Runtime.Media?.getMedia("diskSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        d.addComponent(sprite)

        const colider = new SquareColider(18, 18);
        d.addComponent(colider)

        const controler = new ShootingDiskController();
        controler.breakTime = timeOffsets[i]
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

export function MovingDiskWall(mgr: EntityManager, itemsToDrop?: Items[]) {
    for (let i = 0; i < 6; i++) {
        const d = mgr.createEntity();

        d.transform.y = Constants.WORLD_MIN_Y + 14 + i * 24;
        d.transform.x = Constants.WORLD_MAX_X;

        const sprite = new SpriteComponent(Runtime.Media?.getMedia("diskSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        d.addComponent(sprite)

        const colider = new SquareColider(18, 18);
        d.addComponent(colider)

        const controler = new MovingDiskController();
        controler.moveVector = new Vec2(-150, 0).multiplyScalar(randomNumberInRange(0.4, 1.2))
        controler.canShoot = false
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

export function MovingDisk(mgr: EntityManager, yLevel: number, itemsToDrop?: Items[]) {
    const positions = [new Vec2(0, -16), new Vec2(16, 16), new Vec2(32, 0), new Vec2(48, 24), new Vec2(48, -24), new Vec2(64, 8)]
    for (let i = 0; i < positions.length; i++) {
        const d = mgr.createEntity();

        d.transform.y = yLevel;
        d.transform.x = Constants.WORLD_MAX_X;

        d.transform = d.transform.add(positions[i])

        const sprite = new SpriteComponent(Runtime.Media?.getMedia("diskSprite"), 18, 18);
        sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
        d.addComponent(sprite)

        const colider = new SquareColider(18, 18);
        d.addComponent(colider)

        const controler = new MovingDiskController();
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