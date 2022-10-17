import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { RendnerComponent } from "../../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";

export class UfoController extends ScriptComponent {
    constructor(reverse: number) {
        super();
        this.reverse = reverse
    }
    private moveVector: Vec2 = new Vec2(-150, 0)
    public reverse: number = 1;
    private basicY: number = 0;
    private ticks: number = 0;
    private sprite: SpriteComponent | undefined;
    public maxOffset: number = 50;
    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
        this.basicY = this.entity.transform.y
    }

    onTick = () => {
        this.ticks++;
        if (this.ticks % 3 == 0) {
            this.sprite!.frame++;
            if (this.sprite!.frame == 6) {
                this.sprite!.frame = 0;
            }
        }
        this.entity.transform = this.entity.transform.add(this.moveVector.multiplyScalar(Runtime.deltaTime!));

        const y = this.basicY + Math.sin(Math.PI * (this.entity.transform.x / 80)) * this.maxOffset * this.reverse;
        this.entity.transform.y = y;
    };

}