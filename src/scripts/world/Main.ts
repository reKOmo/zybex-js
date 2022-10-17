import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { Constants } from "../Constants";
import { LevelInfo } from "../level/LevelManager";
import { WorldColider } from "./WorldColider";

class WorldMain extends ScriptComponent {
    constructor() {
        super("worldmain")
    }

    private moveing: boolean = true;
    private img: HTMLImageElement | undefined;
    private colider: WorldColider | undefined

    onInit = () => {
        this.entity.transform.x = Constants.WORLD_MAX_X + 40
        this.img = Runtime.Media?.getMedia(Runtime.GlobalStorage.get(LevelInfo.MAP_ID)) as HTMLImageElement;
        this.colider = this.entity.getComponent(Colider.type) as WorldColider
    };
    onTick = () => {
        if (this.colider?.ready) {
            if (this.moveing && this.entity.transform.x + this.img!.width <= Constants.WORLD_MAX_X) {
                this.moveing = false;
                this.entity.transform.x = Constants.WORLD_MAX_X - this.img!.width
            }

            if (this.moveing) {
                this.entity.transform.x -= Constants.WORLD_SPEED * Runtime.deltaTime!
            }
        }
    };

}

export { WorldMain }