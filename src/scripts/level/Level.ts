import { ColorPallet } from "../../engine/systems/renderer/ColorPallet";
import { Items } from "../item/Items";

export interface Level {
    levelMapId: string;
    enemies: Enemy[];
    colorPallet: ColorPallet
}

export interface Enemy {
    type: number,
    yLevel?: number,
    dropItems?: Items[]
}