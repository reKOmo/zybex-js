import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Runtime } from "../../engine/runtime/Runtime";
import { RendnerComponent } from "../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { ColorPallets } from "../Constants";
import { GunManager } from "./GunManager";

class GunHudC extends ScriptComponent {
    constructor(gunManager: GunManager) {
        super();
        this.gMgr = gunManager
    }

    public gunDisplays: SpriteComponent[] = []
    public levelDisplay: SpriteComponent | undefined


    onInit = () => {
        this.gunDisplays.forEach((g, index) => {
            g.entity.transform.x = 70 + index * 40;
        })
    };

    private gMgr: GunManager;
    private ticks = 0
    private cmap = 0;
    onTick = () => {
        this.ticks++;
        for (let i = 0; i < this.gMgr.enabledGuns.length; i++) {
            if (this.gMgr.enabledGuns[i]) {
                this.gunDisplays[i].enabled = true;
                if (i == this.gMgr.selectedGun) {
                    if (this.ticks % 5 == 0) {
                        let pal = undefined;
                        this.cmap++;
                        this.cmap = this.cmap % 4
                        switch (this.cmap) {
                            case 0:
                                pal = ColorPallets.BLUE;
                                break;
                            case 1:
                                pal = ColorPallets.GREEN;
                                break;
                            case 2:
                                pal = ColorPallets.PINK;
                                break;
                            case 3:
                                pal = ColorPallets.YELLOW;
                                break;
                            default:
                                pal = ColorPallets.RED;
                                break;
                        }
                        this.gunDisplays[i].applyPallet(pal)
                    }
                    this.levelDisplay!.frame = this.gMgr.gunLevels[i] - 1;
                } else {
                    this.gunDisplays[i].resetSprite()
                }
            } else {
                this.gunDisplays[i].enabled = false;
            }
        }
    };

}


export function GunHud(mgr: EntityManager, gmgr: GunManager) {
    const hud = mgr.createEntity("gunHud");
    const gHudControl = new GunHudC(gmgr);
    hud.addComponent(gHudControl)

    for (let i = 0; i < 4; i++) {
        const gd = mgr.createEntity()

        gd.transform.y = 1

        const s = new SpriteComponent(Runtime.Media?.getMedia("hud_guns"), 22, 15)
        s.frame = i;
        s.enabled = false;
        gd.addComponent(s);
        gHudControl.gunDisplays.push(s);
    }

    const lvlD = mgr.createEntity("levelDisplay");
    const lvlS = new SpriteComponent(Runtime.Media?.getMedia("weapon_level"), 22, 15)
    lvlD.transform.y = 1
    lvlD.transform.x = 30
    lvlD.addComponent(lvlS)

    gHudControl.levelDisplay = lvlS
}