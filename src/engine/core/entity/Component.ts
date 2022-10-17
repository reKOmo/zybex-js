import { Entity } from "./Entity";

interface Component {
    readonly type: string;
    readonly basicType?: string;
    entity: Entity;
    onTick?: Function;
    onInit?: Function;

    initialized: boolean;
    enabled: boolean;
}


export { Component };
