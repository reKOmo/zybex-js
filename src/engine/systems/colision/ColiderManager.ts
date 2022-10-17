import { System } from "../../core/system/System"
import { Runtime } from "../../runtime/Runtime";
import { Colider } from "./Colider";

class ColiderManager extends System {
    static colissionEvent: string = "collisionhappened"

    onInit = () => {

    }
    onTick = () => {
        const coliders: Colider[] = [];
        for (let i = 0; i < Runtime.EntityManager!.entities.length; i++) {
            const colid = Runtime.EntityManager!.entities[i].getComponent(Colider.type) as Colider;
            if (colid) {
                if (!colid.initialized) {
                    colid.onInit();
                    colid.initialized = true;
                }
                coliders.push(colid);
            }
        }

        for (let i = 0; i < coliders.length - 1; i++) {
            const colider = coliders[i];
            if (!colider.enabled) {
                colider.overlappingWith = [];
            } else {
                for (let j = i + 1; j < coliders.length; j++) {
                    const index = colider.overlappingWith.findIndex(c => c.entity.name === coliders[j].entity.name)
                    if (colider.isOverlapping(coliders[j])) {
                        if (index === -1 && colider.enabled && coliders[i].enabled) {
                            colider.entity.triggerEvent(ColiderManager.colissionEvent, [coliders[j]])
                            coliders[j].entity.triggerEvent(ColiderManager.colissionEvent, [colider])
                            colider.overlappingWith.push(coliders[j])
                            coliders[j].overlappingWith.push(colider)
                        }
                    } else {
                        colider.overlappingWith.splice(index, 1)
                    }
                }
            }
        }
    }

}

export { ColiderManager }