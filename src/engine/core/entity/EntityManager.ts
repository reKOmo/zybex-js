import { System } from "../system/System";
import { Entity } from "./Entity";

class EntityManager extends System {
    onInit = () => { };
    onTick = () => {
        const toDelete = this.getEntitesByTag("toBedeleTed123");
        for (let i = toDelete.length - 1; i >= 0; i--) {
            this.deleteEntity(toDelete[i].name)
        }
    };
    entities: Entity[] = []

    private nextID = 0;

    createEntity(name: string = `Ent-${++this.nextID}`): Entity {
        const last = this.entities.push(new Entity(name)) - 1;
        return this.entities[last];
    }

    getEntity(name: string): Entity | undefined {
        return this.entities.find(e => e.name === name);
    }

    getEntityIndex(name: string): number {
        return this.entities.findIndex(e => e.name === name);
    }

    getEntitesByTag(tag: string): Entity[] {
        return this.entities.filter(en => en.tags.has(tag))
    }

    deleteEntity(name: string) {
        const index = this.getEntityIndex(name);
        if (index != -1) {
            let e: any = this.entities[index]
            e.parent?.removeChild(e.name);
            for (const prop in e) { if (e.hasOwnProperty(prop)) { delete e[prop] } }
            this.entities.splice(index, 1);
        }
    }

}

export { EntityManager }