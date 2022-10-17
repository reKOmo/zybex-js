import { EntityManager } from "../engine/core/entity/EntityManager";
import { Runtime } from "../engine/runtime/Runtime";
import { RendnerComponent } from "../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../engine/systems/script_processor/ScriptComponent";

export function GameOver(mgr: EntityManager) {
    const e = mgr.createEntity();
    const sprite = new SpriteComponent(Runtime.Media?.getMedia("game_over"), 336, 224)
    e.addComponent(sprite)

    const controller = new GameOverController();
    e.addComponent(controller)
}

export class GameOverController extends ScriptComponent {
    private sprite: SpriteComponent | undefined
    private timePassed: number = 0;
    private ticks: number = 0;
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
    };
    onTick = () => {
        this.ticks++;
        this.timePassed += Runtime.deltaTime!;

        if (this.ticks % 2 == 0) {
            this.sprite!.frame = (this.sprite!.frame + 1) % 13;
        }

        if (this.timePassed > 10 || Runtime.Input.enter) {
            const maxScore = Runtime.GlobalStorage.get("scores")[0].score
            if (Runtime.GlobalStorage.get("currentScore") > maxScore) {
                Runtime.SceneManager?.setScene("save_menu")
            } else {
                Runtime.SceneManager?.setScene("main_menu")
            }
        }
    };

}