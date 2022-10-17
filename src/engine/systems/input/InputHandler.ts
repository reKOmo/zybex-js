import { System } from "../../core/system/System";
import { Runtime } from "../../runtime/Runtime";
import { Input } from "./Input";

class InputHandler extends System {
    private _keyMapping: Map<string, string> = new Map();
    private _keys: Map<string, boolean> = new Map();

    onInit = () => {
        const map = Runtime.Project!.keyMapping;
        for (let i = 0; i < map.length; i++) {
            Input[map[i].event] = false;
            map[i].keys.forEach(k => {
                this._keyMapping.set(k, map[i].event)
            })
        }

        Runtime.Input = Input;

        Runtime.Project!.rootElement!.setAttribute("tabindex", "1");

        Runtime.Project!.rootElement!.addEventListener("keydown", (e) => {
            if (e.key === "Tab" || e.key === "Alt" || e.key === "ContextMenu") {
                e.preventDefault();
                e.stopPropagation();
            }
            this._keys.set(e.key, true);
        })

        Runtime.Project!.rootElement!.addEventListener("keyup", (e) => {
            this._keys.set(e.key, false);
        })

        Runtime.Project!.rootElement!.addEventListener("contextmenu", (e) => {
            e.preventDefault()
        })
    };

    onTick = () => {
        const map = Runtime.Project!.keyMapping;
        for (let i = 0; i < map.length; i++) {
            let final = false;
            for (let j = 0; j < map[i].keys.length; j++) {
                if (this._keys.get(map[i].keys[j])) {
                    final = true;
                    break;
                }
            }
            Input[map[i].event] = final;
        }
    };

}

export { InputHandler }