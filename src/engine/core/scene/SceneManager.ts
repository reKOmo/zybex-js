import { Runtime } from "../../runtime/Runtime";
import { Scene } from "./Scene";

class SceneManager {
    constructor(scenes: Map<string, Scene>, loadingScene: Scene) {
        this._scenes = scenes
        this.currentScene = loadingScene.create();
        Runtime.EntityManager = this.currentScene.entityManager;
    }
    private _scenes: Map<string, Scene>;

    currentScene: Scene;

    setScene(name: string) {
        if (this._scenes.has(name)) {
            console.log(">> Switching to scene: ", name)
            this.currentScene = this._scenes.get(name)!.create()
            Runtime.EntityManager = this.currentScene.entityManager;
        } else throw new Error(`Scene ${name} doesn't exist in project`)
    }

    //TODO unload prev scene EntityManager
}

export { SceneManager }