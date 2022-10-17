import { Component } from "./Component";
import { Vec2 } from "../../math/Vec2";
import { Runtime } from "../../runtime/Runtime";

class Entity {
    constructor(name: string) {
        this.name = name;
    }

    //Ent props
    readonly name: string = "";
    readonly tags: Set<string> = new Set();

    // Transform
    transform: Vec2 = new Vec2();

    get absoluteTransform(): Vec2 {
        let ftran = this.transform.clone();
        let p = this.parent;
        while (p) {
            ftran = ftran.add(p.transform);
            p = p.parent;
        }
        return ftran;
    }

    private _components: Map<string, Component> = new Map();
    private _children: Entity[] = [];

    parent: Entity | undefined = undefined;

    private _eventListeners: Function[] = [];

    deleteSelf() {
        this.addTag("toBedeleTed123")
    }

    addComponent(c: Component) {
        this._components.set(c.type, c);
        c.entity = this;
    }

    getComponent(type: string): Component | undefined {
        return this._components.get(type);
    }

    getComponentsByBasicType(type: string): Component[] {
        const arr: Component[] = [];
        this._components.forEach(c => {
            if (c.basicType === type) {
                arr.push(c)
            }
        })
        return arr;
    }

    deleteComponent(type: string) {
        const comp: any = this._components.get(type);
        if (comp) {
            for (const prop in comp) { if (comp.hasOwnProperty(prop)) { delete comp[prop] } }
            this._components.delete(type);
        }
    }

    hasComponent(type: string): boolean {
        return this._components.has(type);
    }


    addTag(tag: string) {
        this.tags.add(tag);
    }

    removeTag(tag: string) {
        this.tags.delete(tag);
    }

    hasTag(tag: string): boolean {
        return this.tags.has(tag);
    }

    addChild(e: Entity) {
        if (e.parent) {
            throw new Error(`Entity is a child of other entity! ${e}`);
        }
        e.parent = this;
        this._children.push(e)
    }

    removeChild(name: string) {
        const co = this.getChild(name);
        if (co) co.parent = undefined;
        this._children = this._children.filter(c => c.name !== name)
    }

    hasChild(name: string): boolean {
        return this._children.findIndex(c => c.name === name) !== -1;
    }

    getChild(name: string): Entity | undefined {
        return this._children.find(c => c.name === name);
    }

    removeAllChildren() {
        for (let i = 0; i < this._children.length; i++) {
            this.removeChild(this._children[i].name)
        }
    }

    get children() {
        return this._children;
    }

    setParent(parent: Entity | undefined) {
        if (parent) {
            parent.addChild(this);
        }
        this.parent = parent;
    }


    triggerEvent(name: string, payload: any[]) {
        for (let i = 0; i < this._eventListeners.length; i++) {
            this._eventListeners[i](name, payload);
        }
    }

    addEventListener(listener: (name: string, payload: any[]) => void) {
        this._eventListeners.push(listener)
    }
}

export { Entity }