import { Component } from "../../core/entity/Component";
import { Entity } from "../../core/entity/Entity";
import { Colider } from "../colision/Colider";
import { ColiderManager } from "../colision/ColiderManager";

abstract class ScriptComponent implements Component {
    constructor(name: string = `Script-${Math.round(Math.random() * 1000000)}`) {
        this.type = name;
    }
    readonly type: string;
    readonly basicType: string = "script";
    static type: string = "script";
    private _entity: Entity = new Entity("temp");

    get entity() {
        return this._entity
    }

    set entity(e: Entity) {
        this._entity = e;
        this._selfInit();
    }

    enabled: boolean = true;
    initialized: boolean = false;


    abstract onInit: () => void;
    abstract onTick: () => void;

    private _selfInit() {
        this.entity.addEventListener(this._onEvent)
    }

    private _onEvent = (name: string, payload: any[]) => {
        switch (name) {
            case ColiderManager.colissionEvent:
                this.onCollision(payload[0]);
                break;
        }
    }

    public onCollision: (colider: Colider) => void = (colider: Colider) => { };

}

export { ScriptComponent }