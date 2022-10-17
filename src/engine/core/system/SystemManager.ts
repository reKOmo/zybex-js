import { Runtime } from "../../runtime/Runtime"
import { ColiderManager } from "../../systems/colision/ColiderManager";
import { InputHandler } from "../../systems/input/InputHandler";
import { Renderer } from "../../systems/renderer/Renderer"
import { ScriptProcessor } from "../../systems/script_processor/ScriptProcessor";

class SystemManager {
    constructor() {
        //staicly add systems
        this._renderer = new Renderer();
        this._scriptProcessor = new ScriptProcessor();
        this._inputHandler = new InputHandler();
        this._collisionManager = new ColiderManager()
    }

    private _renderer: Renderer;
    private _scriptProcessor: ScriptProcessor;
    private _inputHandler: InputHandler;
    private _collisionManager: ColiderManager

    init() {
        this._inputHandler.onInit();
        this._renderer.onInit();
        this._scriptProcessor.onInit();
        this._collisionManager.onInit()
    }

    functionalTick() {
        this._inputHandler.onTick();
        this._scriptProcessor.onTick();
        this._collisionManager.onTick()



        Runtime.EntityManager!.onTick();
    }

    renderTick() {
        this._renderer.onTick();
    }

}

export { SystemManager }