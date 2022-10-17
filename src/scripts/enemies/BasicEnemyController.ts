import { randomNumberInRange } from "../../engine/math/utils";
import { Vec2 } from "../../engine/math/Vec2";
import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { SquareColider } from "../../engine/systems/colision/SquareColider";
import { RendnerComponent } from "../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { BulletController } from "../bullets/BulletControler";
import { Constants } from "../Constants";
import { EnemyExplosion } from "../Explosion";
import { ItemController } from "../item/ItemController";
import { Items } from "../item/Items";
import { LevelManagerController } from "../level/LevelManager";
import { PlayerControler } from "../player/PlayerControler";

export class BasicEnemyController extends ScriptComponent {
    constructor() {
        super("basicEnemyController")
    }
    public moveVector: Vec2 = new Vec2(Constants.WORLD_SPEED, 0);
    public maxHealth: number = 5;
    public health: number = 5;
    private sprite: SpriteComponent | undefined
    public manageDeath: boolean = true;
    private levelManager: LevelManagerController | undefined;
    public itemToDrop: Items | undefined
    private player: PlayerControler | undefined

    onInit = () => {
        this.player = Runtime.EntityManager?.getEntity("player")?.getComponent("player_contoler") as PlayerControler
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent;
        this.entity.addTag("enemy")
        this.levelManager = Runtime.EntityManager!.getEntity("levelmanager")!.getComponent("levelmanager") as LevelManagerController;
        if (this.manageDeath)
            this.levelManager.enemiesAlive++;
    };
    onTick = () => {
        this.entity.transform.add(this.moveVector.multiplyScalar(Runtime.deltaTime!))
        if (this.entity.absoluteTransform.x <= 0) {
            this.killSelf()
        }
    };

    onCollision = (colider: Colider) => {
        if (colider.entity.hasTag("player_bullet")) {
            const controller = colider.entity.getComponent("bulletcontroller") as BulletController;
            if (controller) {
                if (this.entity.transform.x < Constants.WORLD_MAX_X - 1) {
                    this.health -= controller.damage;
                }
                if (this.health <= 0) {
                    this.player!.score += 50;
                    let e = EnemyExplosion(Runtime.EntityManager!)
                    e.transform = this.entity.absoluteTransform.clone();
                    this.killSelf()
                }
            }
        }
    };

    killSelf() {
        this.entity.addTag("dead");
        this.sprite!.enabled = false;
        this.dropItem();
        if (this.manageDeath && this.levelManager!.enemiesAlive > 0) {
            this.levelManager!.enemiesAlive--;
            this.entity.deleteSelf();
        }
    }

    dropItem() {
        if (this.itemToDrop) {
            const item = Runtime.EntityManager!.createEntity()
            item.addTag("item")
            item.addTag(this.itemToDrop);
            let sprite = undefined;
            switch (this.itemToDrop) {
                case Items.HP:
                    sprite = new SpriteComponent(Runtime.Media?.getMedia("hp_icon"));
                    break
                case Items.BASIC_GUN:
                    sprite = new SpriteComponent(Runtime.Media?.getMedia("hud_guns"), 22, 15);
                    break
                case Items.EWAY_GUN:
                    sprite = new SpriteComponent(Runtime.Media?.getMedia("hud_guns"), 22, 15);
                    sprite.frame = 3
                    break
                case Items.RAIL_GUN:
                    sprite = new SpriteComponent(Runtime.Media?.getMedia("hud_guns"), 22, 15);
                    sprite.frame = 1
                    break
                case Items.PULS_GUN:
                    sprite = new SpriteComponent(Runtime.Media?.getMedia("hud_guns"), 22, 15);
                    sprite.frame = 2
                    break
            }
            item.addComponent(sprite);
            item.transform = this.entity.absoluteTransform.clone();
            item.transform.x += Math.floor(randomNumberInRange(-3, 3))
            item.transform.y += Math.floor(randomNumberInRange(-3, 3))

            const colider = new SquareColider(22, 15)
            item.addComponent(colider)

            const cont = new ItemController();
            item.addComponent(cont)

            this.itemToDrop = undefined
        }
    }

}