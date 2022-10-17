import { Component } from "../../core/entity/Component";
import { Entity } from "../../core/entity/Entity";
import { Vec2 } from "../../math/Vec2";

abstract class RendnerComponent implements Component {
    initialized: boolean = false;
    enabled: boolean = true;
    onInit = () => { };
    abstract onTick: (context: CanvasRenderingContext2D) => void;
    entity: Entity = new Entity("temp");
    size: Vec2 = new Vec2(0, 0);
    readonly type = "RenderComponent";
    static type = "RenderComponent";
}

export { RendnerComponent }