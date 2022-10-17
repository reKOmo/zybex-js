import { Component } from "../../core/entity/Component";
import { Entity } from "../../core/entity/Entity";
export abstract class Colider implements Component {
    entity: Entity = new Entity("temp");
    type: string = "colidercomponent";
    static type: string = "colidercomponent"
    initialized: boolean = true;
    enabled: boolean = true;

    onInit = () => { };

    overlappingWith: Colider[] = []

    abstract isOverlapping: (colider: any) => boolean

}