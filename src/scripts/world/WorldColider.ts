import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { SquareColider } from "../../engine/systems/colision/SquareColider";
import { Constants } from "../Constants";
import { LevelInfo } from "../level/LevelManager";
import { WorldMain } from "./Main";

export class WorldColider extends Colider {
    constructor() {
        super()
        this.initialized = false;
    }
    public _world: number[][] = [];
    public ready = false;
    onInit = () => {
        const img = Runtime.Media?.getMedia(Runtime.GlobalStorage.get(LevelInfo.MAP_ID)) as HTMLImageElement;

        const can = document.createElement("canvas");
        can.height = img.height;
        can.width = img.width;

        const ctx = can.getContext("2d");
        if (ctx) {
            ctx.drawImage(img, 0, 0)

            const imgData = ctx.getImageData(0, 0, img.width, img.height);


            const blockSize = 8;
            const maxX = img.width / blockSize;
            const maxY = img.height / blockSize;

            for (let x = 0; x < maxX; x++) {
                this._world[x] = [];
                for (let z = 0; z < maxY; z++) {
                    this._world[x][z] = 0
                }
            }

            const tmp: number[][] = [];
            for (let x = 0; x < img.width; x++) {
                tmp[x] = [];
                for (let z = 0; z < img.height; z++) {
                    tmp[x][z] = 0
                }
            }

            let iter = 0;
            for (let i = 0; i < imgData.data.length; i += 4) {
                const value = imgData.data[i + 3];
                const x = Math.floor(iter / img.width);
                const y = iter % img.width;

                tmp[y][x] = value;
                iter++;
            }



            for (let x = 0; x < maxX; x++) {
                for (let y = 0; y < maxY; y++) {
                    let sum = 0;
                    for (let i = 0; i < blockSize; i++) {
                        for (let j = 0; j < blockSize; j++) {
                            sum += tmp[x * blockSize + i][y * blockSize + j];
                        }

                    }
                    if (sum > 6528) {
                        this._world[x][y] = 1
                        ctx.fillStyle = "red"
                        ctx.fillRect(x * 8, y * 8, 8, 8)
                    } else {
                        this._world[x][y] = 0
                    }
                }

            }
            this.ready = true;
            //console.log(can.toDataURL())
        }
    }

    isOverlapping = (colider: SquareColider): boolean => {
        const cellScreenSize = 8
        const x = Math.floor((colider.x - this.entity.absoluteTransform.x) / cellScreenSize)
        const x1 = Math.floor((colider.x1 - this.entity.absoluteTransform.x) / cellScreenSize)
        const y = Math.floor((colider.y - this.entity.absoluteTransform.y) / cellScreenSize)
        const y1 = Math.floor((colider.y1 - this.entity.absoluteTransform.y) / cellScreenSize)
        if (x > 0 && y > 0 && x < this._world.length && y < this._world[x].length && this._world[x][y] == 1) return true;
        if (x1 > 0 && y > 0 && x1 < this._world.length && y < this._world[x1].length && this._world[x1][y] == 1) return true;
        if (x > 0 && y1 > 0 && x < this._world.length && y1 < this._world[x].length && this._world[x][y1] == 1) return true;
        if (x1 > 0 && y1 > 0 && x1 < this._world.length && y1 < this._world[x1].length && this._world[x1][y1] == 1) return true;

        return false;
    }

}