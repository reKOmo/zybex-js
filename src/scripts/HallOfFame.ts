import { EntityManager } from "../engine/core/entity/EntityManager";
import { Runtime } from "../engine/runtime/Runtime";
import { RendnerComponent } from "../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../engine/systems/script_processor/ScriptComponent";
import { DrawableSprite } from "./SaveScore";

export function HallOfFame(mgr: EntityManager) {
    const e = mgr.createEntity();
    const sprite = new DrawableSprite(Runtime.Media?.getMedia("hallOfFame"), 336, 224)
    e.addComponent(sprite)

    const controller = new HAllOfFAmeController();
    e.addComponent(controller)
}

export class HAllOfFAmeController extends ScriptComponent {
    private sprite: DrawableSprite | undefined
    private timePassed: number = 0;
    private ticks: number = 0;
    private keyDown = true;
    private scores: { name: string, score: number }[] = []
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as DrawableSprite;
        this.sprite.draw = this.draw
        //Runtime.GlobalStorage.set("scores", [{ name: "aaa", score: 123 }, { name: "aaa", score: 123 }, { name: "aaa", score: 123 }, { name: "aaa", score: 123 }, { name: "aaa", score: 123 }])
        this.scores = Runtime.GlobalStorage.get("scores")
    };
    onTick = () => {
        this.ticks++;
        this.timePassed += Runtime.deltaTime!;

        if (!Runtime.Input.enter) this.keyDown = false

        if (Runtime.Input.enter && !this.keyDown) {
            Runtime.SceneManager?.setScene("wait_for_level")
        }

        if (this.timePassed > 10) {
            Runtime.SceneManager?.setScene("main_menu")
        }
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

    draw = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "white"
        context.font = "20px 8 Bit Wonder";
        for (let i = 0; i < this.scores.length; i++) {

            context.fillText(this.formatScore(this.scores[i].score) + "            " + this.scores[i].name, 100, 69 + i * 24);
        }
    }

}