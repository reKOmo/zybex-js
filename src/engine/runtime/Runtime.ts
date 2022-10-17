import { EntityManager } from "../core/entity/EntityManager";
import { MediaStorage } from "../core/media/MediaStorage";
import { Project } from "../core/project/Project";
import { SceneManager } from "../core/scene/SceneManager";
import { SystemManager } from "../core/system/SystemManager";

interface Runtime {
    EntityManager?: EntityManager,
    SystemManager?: SystemManager,
    deltaTime?: number,
    Project?: Project,
    SceneManager?: SceneManager,
    Media?: MediaStorage,
    Input?: any
    GlobalStorage: Map<string, any>
}

const Runtime: Runtime = {
    GlobalStorage: new Map()
}

export { Runtime }