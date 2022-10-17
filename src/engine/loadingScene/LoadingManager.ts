import { MediaManager } from "../core/media/MediaManager";
import { Runtime } from "../runtime/Runtime";
import { ScriptComponent } from "../systems/script_processor/ScriptComponent";

class LoadingManager extends ScriptComponent {
    constructor(mediaManager: MediaManager) {
        super();
        this._mediaManager = mediaManager;
    }
    private _mediaManager: MediaManager;
    private _itemsLoaded: number = 0;
    private _itemsTotal: number = 0;
    private _doneLoading = false;
    onInit = () => {
        console.log(">> Started loading manager")

        this._mediaManager.onStart = (total) => {
            this._itemsTotal = total;
        }

        this._mediaManager.onItemLoaded = (loaded, total) => {
            this._itemsLoaded = loaded;
            this._itemsTotal = total;
        }

        this._mediaManager.onEnd = () => {
            this._doneLoading = true;
        }

        this._mediaManager.loadMedia();
    };
    onTick = () => {
        //! remove
        console.log(`Loaded: ${this._itemsLoaded}, Total: ${this._itemsTotal}`)
        if (this._doneLoading) {
            Runtime.SceneManager?.setScene(Runtime.Project!.startScene)
        }
    };
}

export { LoadingManager }