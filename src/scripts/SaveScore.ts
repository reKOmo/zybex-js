import { EntityManager } from "../engine/core/entity/EntityManager";
import { Runtime } from "../engine/runtime/Runtime";
import { RendnerComponent } from "../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../engine/systems/script_processor/ScriptComponent";

export function SaveMenu(mgr: EntityManager) {
    const e = mgr.createEntity();
    const sprite = new DrawableSprite(Runtime.Media?.getMedia("save_score"), 336, 224)
    e.addComponent(sprite)

    const controller = new SaveMenuController();
    e.addComponent(controller)
}

export class DrawableSprite extends RendnerComponent {
    constructor(spritesheet: any, w?: number, h?: number, srcW?: number, srcH?: number) {
        super();
        this.spriteSheet = spritesheet as HTMLImageElement;
        this.w = w ? w : this.spriteSheet.width;
        this.h = h ? h : this.spriteSheet.height;
        this.srcW = srcW ? srcW : this.w;
        this.srcH = srcH ? srcH : this.h;
    }

    private spriteSheet: HTMLImageElement;
    private w: number;
    private h: number;
    private srcW: number;
    private srcH: number;
    public frame: number = 0;

    onTick = (context: CanvasRenderingContext2D) => {
        context.drawImage(this.spriteSheet, 0, this.srcH * this.frame, this.srcW, this.srcH, this.entity.absoluteTransform.x, this.entity.absoluteTransform.y, this.w, this.h)
        this.draw(context)
    };

    public draw: (context: CanvasRenderingContext2D) => void = () => { }

}

export class SaveMenuController extends ScriptComponent {
    private sprite: DrawableSprite | undefined
    private timePassed: number = 0;
    private ticks: number = 0;

    private letters = Array.from("?ABCDEFGHIJKLMNOPQRTSVUWXYZ")

    private selecectedLetters = [0, 0, 0]
    configming: number = 0;

    private keyDown: boolean = true;

    getName() {
        return this.letters[this.selecectedLetters[0]] + this.letters[this.selecectedLetters[1]] + this.letters[this.selecectedLetters[2]]
    }


    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as DrawableSprite;
        this.sprite.draw = this.draw
    };
    onTick = () => {
        this.ticks++;
        this.timePassed += Runtime.deltaTime!;


        if (!this.keyDown && Runtime.Input.enter) {
            this.keyDown = true;
            this.configming++;

            if (this.configming == 3) {
                const s = Runtime.GlobalStorage.get("scores")
                s.pop()
                s.unshift({ name: this.getName(), score: Runtime.GlobalStorage.get("currentScore") })
                Runtime.GlobalStorage.set("currentScore", 0)
                Runtime.SceneManager?.setScene("hall_of_fame")
            }
        }

        if (!Runtime.Input.enter) {
            this.keyDown = false;
        }

        if (Runtime.Input.up && this.ticks % 3 == 0) {
            this.selecectedLetters[this.configming] = (this.selecectedLetters[this.configming] + 1) % this.letters.length
        }
        if (Runtime.Input.down && this.ticks % 3 == 0) {
            this.selecectedLetters[this.configming] = this.selecectedLetters[this.configming] - 1 < 0 ? this.letters.length - 1 : this.selecectedLetters[this.configming] - 1
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
        context.fillText(this.formatScore(Runtime.GlobalStorage.get("currentScore")) + "            " + this.getName(), 102, 95);
    }

}