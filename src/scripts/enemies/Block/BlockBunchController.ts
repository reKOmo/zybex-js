import { Entity } from "../../../engine/core/entity/Entity";
import { Vec2 } from "../../../engine/math/Vec2";
import { Runtime } from "../../../engine/runtime/Runtime";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { Constants } from "../../Constants";
import { LevelManagerController } from "../../level/LevelManager";
import { DiagnalBlock, StairBlock } from "./Block";
import { BlockBaseController } from "./BlockBaseController";

export class BlockBunchController extends ScriptComponent {
    constructor() {
        super("blockBunchController")
    }
    public top: boolean = true;
    private blocks: BlockBaseController[] = [];
    private timePassed: number = 0;
    private lastGo: number = 0
    private waitDutration = 0.4;
    private makeGo: number = 0;
    private readonly batchSize: number = 6;
    public blocksAlive: number = this.batchSize
    private levelManager: LevelManagerController | undefined;
    onInit = () => {
        this.levelManager = Runtime.EntityManager!.getEntity("levelmanager")!.getComponent("levelmanager") as LevelManagerController;
        this.levelManager.enemiesAlive++;
        if (this.top) {
            for (let i = 0; i < this.batchSize; i++) {
                const e: Entity = DiagnalBlock(Runtime.EntityManager!) as Entity;
                e.transform = new Vec2(30 + i * 16, Constants.WORLD_MIN_Y)

                const c = e.getComponent("diagblock") as BlockBaseController;
                this.blocks.push(c)
            }
        } else {
            this.waitDutration = 0.3;
            for (let i = 0; i < this.batchSize; i++) {
                const e: Entity = StairBlock(Runtime.EntityManager!) as Entity;
                e.transform = new Vec2(30 + i * 16, Constants.WORLD_MAX_Y - 22)

                const c = e.getComponent("stairblock") as BlockBaseController;
                this.blocks.push(c)
            }
        }
    };
    onTick = () => {
        this.timePassed += Runtime.deltaTime!;
        if (this.timePassed - this.lastGo > this.waitDutration) {
            this.lastGo = this.timePassed;

            if (this.makeGo < this.batchSize) {
                this.blocks[this.batchSize - 1 - this.makeGo].go()
                this.makeGo++;
            }

        }

        for (let i = this.blocks.length - 1; i >= 0; i--) {
            if (this.blocks[i].entity.hasTag("dead")) {
                this.blocksAlive--;
                this.blocks[i].entity.deleteSelf();
                this.blocks.splice(i, 1)
            }
        }

        if (this.blocksAlive == 0) {
            this.levelManager!.enemiesAlive--;
            this.entity.deleteSelf();
        }

    };

}