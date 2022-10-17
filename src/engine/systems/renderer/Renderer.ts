import { System } from "../../core/system/System"
import { Runtime } from "../../runtime/Runtime";
import { RendnerComponent } from "./RenderComponent";


class Renderer extends System {
    constructor() {
        super();
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = "100%";
        this._context2d = this._canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    private _resW: number = 0;
    private _resH: number = 0;
    private _canvas: HTMLCanvasElement;
    private _context2d: CanvasRenderingContext2D;
    onInit = () => {
        this._resH = Runtime.Project!.resolution.y;
        this._resW = Runtime.Project!.resolution.x;

        this._canvas.width = this._resW;
        this._canvas.height = this._resH;
        this._canvas.style.imageRendering = "pixelated";

        Runtime.Project!.rootElement?.appendChild(this._canvas)

        this._context2d.imageSmoothingEnabled = false;
    }

    onTick = () => {
        this._context2d.fillStyle = "black"
        this._context2d.fillRect(0, 0, this._resW, this._resH);
        for (let i = 0; i < Runtime.EntityManager!.entities.length; i++) {
            const r = Runtime.EntityManager!.entities[i].getComponent(RendnerComponent.type) as RendnerComponent;
            if (r) {
                if (!r.initialized) {
                    r.onInit();
                    r.initialized = true;
                }
                if (r.enabled) {
                    r.onTick(this._context2d);
                }
            }
        }
    }

}

export { Renderer }