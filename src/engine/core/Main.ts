import { LoadingScene } from "../loadingScene/LoadingScene";
import { Runtime } from "../runtime/Runtime";
import { MediaManager } from "./media/MediaManager";
import { Project } from "./project/Project";
import { Scene } from "./scene/Scene";
import { SceneManager } from "./scene/SceneManager";
import { SystemManager } from "./system/SystemManager";

class Main {
    constructor(project: Project) {
        this.systemManager = new SystemManager();
        this.mediaManager = new MediaManager();
        this.sceneManager = new SceneManager(project.scenes, LoadingScene(this.mediaManager));
        Runtime.Project = project;
        this.project = project;
    }

    project: Project;
    sceneManager: SceneManager;
    systemManager: SystemManager;
    mediaManager: MediaManager;

    load() {
        console.log(`
         ______  _______      _             
        (____  \\(_______)    (_)            
         ____)  )_____   ____ _ ____   ____ 
        |  __  (|  ___) / _  | |  _ \\ / _  )
        | |__)  ) |____( ( | | | | | ( (/ / 
        |______/|_______)_|| |_|_| |_|\\____)
                       (_____| By reKOmo
        `);

        this.mediaManager.media = this.project.media;

        Runtime.SceneManager = this.sceneManager;
        Runtime.Media = this.mediaManager.MediaStorage;

        this.systemManager.init();
    }

    start() {
        this._loop(0, 0);
    }

    private _loop(lastTickTime: number, tFrame: number) {
        const tpsTime = 1000 / this.project.tps;
        const timeFromLastFrame = tFrame - lastTickTime;
        //Update deltatime
        Runtime.deltaTime = timeFromLastFrame / 1000;

        let currTickTime = lastTickTime;
        // run update function on tick
        if (timeFromLastFrame >= tpsTime) {
            this.systemManager.functionalTick();
            currTickTime = tFrame;
        }

        //render
        this.systemManager.renderTick();


        window.requestAnimationFrame(this._loop.bind(this, currTickTime))
    }
}

export { Main }