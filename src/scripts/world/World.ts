import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Runtime } from "../../engine/runtime/Runtime";
import { SpriteComponent } from "../../engine/systems/renderer/SpriteComponent";
import { Constants } from "../Constants";
import { LevelInfo } from "../level/LevelManager";
import { WorldMain } from "./Main";
import { WorldRender } from "./Render";
import { WorldColider } from "./WorldColider";

export function World(mgr: EntityManager) {
    let world = mgr.createEntity("world")
    world.transform.y = Constants.WORLD_MIN_Y
    const worldScript = new WorldMain();
    world.addComponent(worldScript);
    const worldRender = new SpriteComponent(Runtime.Media?.getMedia("level1"));
    worldRender.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    world.addComponent(worldRender);
    const worldColider = new WorldColider();
    world.addComponent(worldColider)

    return worldColider
}