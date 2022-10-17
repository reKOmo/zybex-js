import { System } from "../../core/system/System";
import { Runtime } from "../../runtime/Runtime";
import { ScriptComponent } from "./ScriptComponent";

class ScriptProcessor extends System {
    constructor() {
        super();
    }

    onInit = () => {
        for (let i = 0; i < Runtime.EntityManager!.entities.length; i++) {
            const s = Runtime.EntityManager!.entities[i].getComponentsByBasicType(ScriptComponent.type) as ScriptComponent[];
            if (s.length > 0) {
                for (let j = 0; j < s.length; j++) {
                    s[j].onInit();
                    s[j].initialized = true;
                }
            }
        }
    }

    onTick = () => {
        for (let i = 0; i < Runtime.EntityManager!.entities.length; i++) {
            const s = Runtime.EntityManager!.entities[i].getComponentsByBasicType(ScriptComponent.type) as ScriptComponent[];
            if (s.length > 0) {
                for (let j = 0; j < s.length; j++) {
                    if (!s[j].initialized) {
                        s[j].onInit();
                        s[j].initialized = true;
                    }
                    if (s[j].enabled) {
                        s[j].onTick();
                    }
                }
            }
        }
    };
}

export { ScriptProcessor }