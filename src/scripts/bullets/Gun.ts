import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";

export abstract class Gun extends ScriptComponent {
    abstract bulletsAlive: number;
    level?: number
}