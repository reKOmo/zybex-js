import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Runtime } from "../../engine/runtime/Runtime";
import { SquareColider } from "../../engine/systems/colision/SquareColider";
import { SpriteComponent } from "../../engine/systems/renderer/SpriteComponent";
import { ColorPallets, Constants } from "../Constants";
import { GunManager } from "./GunManager";
import { PlayerControler } from "./PlayerControler";
import { PlayerSprite } from "./PlayerSprite";

export function Player(mgr: EntityManager) {
    let player = mgr.createEntity("player")
    player.transform.y = 80;
    const playerScript = new PlayerControler();
    player.addComponent(playerScript);
    const playerSprite = new SpriteComponent(Runtime.Media?.getMedia("player_sprite"), 16, 18);
    playerSprite.applyPallet(ColorPallets.RED)
    player.addComponent(playerSprite)
    const playerColider = new SquareColider(16, 18);
    player.addComponent(playerColider)
    const gunManager = new GunManager();
    player.addComponent(gunManager)

    return playerScript;
}