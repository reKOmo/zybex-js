import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { RendnerComponent } from "../../engine/systems/renderer/RenderComponent";
import { Constants } from "../Constants";
import { WorldMain } from "./Main";
import { WorldColider } from "./WorldColider";

class WorldRender extends RendnerComponent {
    private _world: number[][] = [];
    onInit = () => {
        this._world = (this.entity.getComponent(Colider.type) as WorldColider)!._world
    }
    onTick = (context: CanvasRenderingContext2D) => {
        const cols = Runtime.Project!.resolution.x / 8
        const rows = Runtime.Project!.resolution.x / 8
        context.strokeStyle = "red"
        for (let i = 0; i < 200; i++) {
            for (let j = 0; j < 20; j++) {
                //console.log(this._world[i][j])
                if (this._world[j][i] == 1) {
                    context.fillStyle = "red"
                    context.fillRect(i * 8, j * 8, 8, 8)
                }
            }
        }
    };

}

export { WorldRender }