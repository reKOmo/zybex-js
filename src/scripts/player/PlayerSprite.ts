import { RendnerComponent } from "../../engine/systems/renderer/RenderComponent";
import { Constants } from "../Constants";

export class PlayerSprite extends RendnerComponent {
    onTick = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "green"
        context.fillRect(this.entity.absoluteTransform.x, this.entity.absoluteTransform.y, Constants.PLAYER_SIZE.x, Constants.PLAYER_SIZE.y);
    };

}