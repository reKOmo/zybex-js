import { EntityManager } from "../engine/core/entity/EntityManager";
import { Runtime } from "../engine/runtime/Runtime";
import { RendnerComponent } from "../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../engine/systems/script_processor/ScriptComponent";
import { LevelInfo } from "./level/LevelManager";

export function Explosion(mgr: EntityManager) {
    const e = mgr.createEntity();
    const s = new SpriteComponent(Runtime.Media?.getMedia("player_explosion"), 14, 20);
    e.addComponent(s);
    const c = new ExpolsionC(13);
    e.addComponent(c);

    return e;
}

export function EnemyExplosion(mgr: EntityManager) {
    const e = mgr.createEntity();
    const s = new SpriteComponent(Runtime.Media?.getMedia("enemy_explosion"), 18, 20);
    s.applyPallet(Runtime.GlobalStorage.get(LevelInfo.PALLET))
    e.addComponent(s);
    const c = new ExpolsionC(5);
    e.addComponent(c);

    return e;
}

class ExpolsionC extends ScriptComponent {
    constructor(maxF: number) {
        super();
        this.maxF = maxF
    }
    private ticks: number = 0;
    private _sprite: SpriteComponent | undefined
    private maxF: number;
    onInit = () => {
        this._sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent
    };
    onTick = () => {
        if (this.ticks % 3 == 0 && this._sprite!.frame < this.maxF) {
            this._sprite!.frame++;
        }

        if (this._sprite!.frame === this.maxF) {
            this.entity.deleteSelf()
        }

        this.ticks++;

    };

}