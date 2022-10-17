import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Runtime } from "../../engine/runtime/Runtime";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { BlockBuchBottom, BlockBuchTop } from "../enemies/Block/Block";
import { MovingDisk, MovingDiskWall, StationaryDiskWall } from "../enemies/Disk/Disk";
import { MovingSpike, NormalSpike } from "../enemies/Spike/Spike";
import { SquashingBunch } from "../enemies/Squashing/Squashing";
import { ThinBunch, UfoBunch } from "../enemies/Ufo_and_Thin/Ufo_and_Thin";
import { Worm } from "../enemies/Worm/Worm";
import { Player } from "../player/Player";
import { PlayerControler } from "../player/PlayerControler";
import { SpaceShip } from "../player/Ship";
import { World } from "../world/World";
import { WorldColider } from "../world/WorldColider";
import { Level } from "./Level";
import { Levels } from "./Levels";

export class LevelManagerController extends ScriptComponent {
    constructor() {
        super("levelmanager")
    }

    private curentLevel: Level = Levels[0];
    private enemyProgress: number = 0;

    public enemiesAlive: number = 0;
    private player: PlayerControler | undefined;

    private state: number = 0;
    private colider: WorldColider | undefined

    onInit = () => {
        Runtime.GlobalStorage.set("colorPallet", this.curentLevel.colorPallet);
        Runtime.GlobalStorage.set("levelMapId", this.curentLevel.levelMapId);

        this.colider = World(Runtime.EntityManager!)
    };
    onTick = () => {
        if (this.colider?.ready && this.player == undefined) {
            this.player = Player(Runtime.EntityManager!);
        }

        if (this.player) {
            if (this.enemiesAlive == 0 && this.state == 0) {
                this.summonNextEnemy();
            }
            if (this.state == 1) {
                this.player!.state = 2
                this.state = 2
            }
            if (this.player!.state == 3 && this.state == 2) {
                SpaceShip(Runtime.EntityManager!);
                this.state = 3
            }
        }
    };

    summonNextEnemy() {
        if (this.enemyProgress < this.curentLevel.enemies.length) {
            console.log(`Summoning: ${this.enemyProgress}`)
            switch (this.curentLevel.enemies[this.enemyProgress].type) {
                case 0:
                    MovingDisk(Runtime.EntityManager!, this.curentLevel.enemies[this.enemyProgress].yLevel!, this.curentLevel.enemies[this.enemyProgress].dropItems)
                    break;
                case 1:
                    StationaryDiskWall(Runtime.EntityManager!, this.curentLevel.enemies[this.enemyProgress].dropItems)
                    break;
                case 2:
                    MovingDiskWall(Runtime.EntityManager!, this.curentLevel.enemies[this.enemyProgress].dropItems)
                    break;
                case 3:
                    NormalSpike(Runtime.EntityManager!);
                    break
                case 4:
                    MovingSpike(Runtime.EntityManager!, true, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break
                case 5:
                    Worm(Runtime.EntityManager!, this.curentLevel.enemies[this.enemyProgress].dropItems);
                    break;
                case 6:
                    SquashingBunch(Runtime.EntityManager!, this.curentLevel.enemies[this.enemyProgress].yLevel!)
                    break;
                case 7:
                    UfoBunch(Runtime.EntityManager!, this.curentLevel.enemies[this.enemyProgress].dropItems)
                    break
                case 8:
                    ThinBunch(Runtime.EntityManager!);
                    break;
                case 9:
                    BlockBuchTop(Runtime.EntityManager!)
                    break;
                case 10:
                    BlockBuchBottom(Runtime.EntityManager!)
            }
            this.enemyProgress++;
        } else {
            this.state = 1;
        }
    }
}

export function LevelManager(mgr: EntityManager) {
    const m = mgr.createEntity("levelmanager");

    const c = new LevelManagerController();
    m.addComponent(c);
}

export enum LevelInfo {
    PALLET = "colorPallet",
    MAP_ID = "levelMapId"
}