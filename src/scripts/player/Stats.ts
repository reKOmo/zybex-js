import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Runtime } from "../../engine/runtime/Runtime";
import { RendnerComponent } from "../../engine/systems/renderer/RenderComponent";
import { Constants } from "../Constants";
import { GunManager } from "./GunManager";
import { PlayerControler } from "./PlayerControler";

class StatsREnder extends RendnerComponent {
    private player: PlayerControler | undefined
    private gunManager: GunManager | undefined
    onInit = () => {
        this.player = Runtime.EntityManager?.getEntity("player")?.getComponent("player_contoler") as PlayerControler
        this.gunManager = this.player.entity.getComponent("gunmanager") as GunManager
    };

    private weaponNames = ["Orbit", "Rail", "Pulse", "8 Way"]

    onTick = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "white"
        context.font = "10px 8 Bit Wonder";
        context.fillText(`P1   ${this.formatScore(this.player!.score)}   Lives ${this.player?.lives}    ${this.weaponNames[this.gunManager!.selectedGun]}`, this.entity.absoluteTransform.x, this.entity.absoluteTransform.y);
    };

    formatScore(score: number): string {
        const finalD = 6
        const digits = score == 0 ? 1 : Math.floor(Math.log10(score) + 1)
        let fText = ""
        for (let i = 0; i < finalD - digits; i++) {
            fText += "0"
        }
        return fText + score
    }

}

export function Stats(mgr: EntityManager) {
    const e = mgr.createEntity("stats_display");
    e.transform.y = Constants.WORLD_MAX_Y + 10
    e.transform.x = 10
    const r = new StatsREnder();

    e.addComponent(r)

}