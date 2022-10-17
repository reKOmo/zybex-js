import { Entity } from "../../../engine/core/entity/Entity";
import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { Runtime } from "../../../engine/runtime/Runtime";
import { SquareColider } from "../../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { LevelInfo } from "../../level/LevelManager";
import { BasicEnemyController } from "../BasicEnemyController";
import { BlockBunchController } from "./BlockBunchController";
import { BlockDiagnal } from "./BlockDiagnal";
import { BlockStair } from "./BlockStair";


export function BlockBuchTop(mgr: EntityManager) {
    const d = mgr.createEntity("blockBunchController");

    const controler = new BlockBunchController();
    controler.top = true;
    d.addComponent(controler)
}

export function BlockBuchBottom(mgr: EntityManager) {
    const d = mgr.createEntity("blockBunchController");

    const controler = new BlockBunchController();
    controler.top = false;
    d.addComponent(controler)
}

export function DiagnalBlock(mgr: EntityManager): Entity {
    const d = mgr.createEntity();

    const sprite = new SpriteComponent(Runtime.Media?.getMedia("blockSprite"), 18, 18);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    d.addComponent(sprite)

    const colider = new SquareColider(18, 18);
    d.addComponent(colider)

    const controler = new BlockDiagnal();
    d.addComponent(controler)


    const bcont = new BasicEnemyController();
    bcont.manageDeath = false;
    d.addComponent(bcont)

    return d;
}

export function StairBlock(mgr: EntityManager): Entity {
    const d = mgr.createEntity();

    const sprite = new SpriteComponent(Runtime.Media?.getMedia("blockSprite"), 18, 18);
    sprite.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    d.addComponent(sprite)

    const colider = new SquareColider(18, 18);
    d.addComponent(colider)

    const controler = new BlockStair();
    d.addComponent(controler)


    const bcont = new BasicEnemyController();
    bcont.manageDeath = false;
    d.addComponent(bcont)

    return d;
}