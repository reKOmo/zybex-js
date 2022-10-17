import { EntityManager } from "../engine/core/entity/EntityManager";
import { Runtime } from "../engine/runtime/Runtime";
import { RendnerComponent } from "../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../engine/systems/script_processor/ScriptComponent";

export function MainMenu(mgr: EntityManager) {
    const e = mgr.createEntity();
    const sprite = new SpriteComponent(Runtime.Media?.getMedia("main_menu"), 336, 224)
    e.addComponent(sprite)

    const controller = new MainMEnuController();
    e.addComponent(controller)
}

export class MainMEnuController extends ScriptComponent {
    private sprite: SpriteComponent | undefined
    private timePassed: number = 0;
    private ticks: number = 0;
    private keyDown = true;
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
        if (!Runtime.GlobalStorage.has("scores"))
            Runtime.GlobalStorage.set("scores", [{ name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }, { name: "---", score: 0 }])
    };
    onTick = () => {
        this.ticks++;
        this.timePassed += Runtime.deltaTime!;

        if (this.ticks % 2 == 0) {
            this.sprite!.frame = (this.sprite!.frame + 1) % 5;
        }
        if (!Runtime.Input.enter) this.keyDown = false

        if (this.timePassed > 10) {
            Runtime.SceneManager?.setScene("hall_of_fame")
        }

        if (Runtime.Input.enter && !this.keyDown) {
            Runtime.SceneManager?.setScene("wait_for_level")
        }
    };

}