import { MediaManager } from "../core/media/MediaManager";
import { Scene } from "../core/scene/Scene";
import { LoadingManager } from "./LoadingManager";

export function LoadingScene(mediaMgr: MediaManager): Scene {
    const s = new Scene("loadingScene");
    s.sceneCreator = (entMgr) => {
        const loader = entMgr.createEntity("loadingManager");
        const loadingComponent = new LoadingManager(mediaMgr);
        loader.addComponent(loadingComponent);
    }
    return s;
}