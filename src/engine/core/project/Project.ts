import { Vec2 } from "../../math/Vec2";
import { Media } from "../media/Media";
import { Scene } from "../scene/Scene";

class Project {
    resolution: Vec2 = new Vec2(200, 200);
    scenes: Map<string, Scene> = new Map();
    startScene: string = "";
    tps: number = 20;
    rootElement: HTMLElement | undefined;
    keyMapping: { event: string, keys: string[] }[] = [];
    media: Media[] = []

    addScene(scene: Scene) {
        this.scenes.set(scene.name, scene);
    }
}

export { Project }