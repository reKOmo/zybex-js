import { EntityManager } from "../engine/core/entity/EntityManager";
import { Runtime } from "../engine/runtime/Runtime";
import { RendnerComponent } from "../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../engine/systems/script_processor/ScriptComponent";

export function WaitLevel(mgr: EntityManager) {
    const e = mgr.createEntity();
    const sprite = new SpriteComponent(Runtime.Media?.getMedia("wait_menu"), 336, 224)
    e.addComponent(sprite)

    const controller = new WaitMenuC();
    e.addComponent(controller)
}

export class WaitMenuC extends ScriptComponent {
    private sprite: SpriteComponent | undefined
    private timePassed: number = 0;
    private ticks: number = 0;
    private keyDown = true;
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
    };
    onTick = () => {
        this.ticks++;
        this.timePassed += Runtime.deltaTime!;

        if (this.ticks % 2 == 0) {
            this.sprite!.frame = (this.sprite!.frame + 1) % 13;
        }

        if (!Runtime.Input.enter) this.keyDown = false

        if (this.timePassed > 10 || (Runtime.Input.enter && !this.keyDown)) {
            Runtime.SceneManager?.setScene("main")
        }
    };

}