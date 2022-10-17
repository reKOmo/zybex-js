import { EntityManager } from "../entity/EntityManager";

class Scene {
    constructor(name: string) {
        this.name = name;
    }

    readonly name: string = "";
    entityManager: EntityManager = new EntityManager;
    private _scFunc: (entityManager: EntityManager) => void = () => { }

    set sceneCreator(s: (entityManager: EntityManager) => void) {
        this._scFunc = s;
    }

    create(): Scene {
        this.entityManager = new EntityManager();
        this._scFunc(this.entityManager);
        return this
    }
}

export { Scene }