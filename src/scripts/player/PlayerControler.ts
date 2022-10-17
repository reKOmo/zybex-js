import { Vec2 } from "../../engine/math/Vec2";
import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { RendnerComponent } from "../../engine/systems/renderer/RenderComponent";
import { SpriteComponent } from "../../engine/systems/renderer/SpriteComponent";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { ColorPallets, Constants } from "../Constants";
import { Explosion } from "../Explosion";
import { Items } from "../item/Items";
import { GunManager } from "./GunManager";
import { Stats } from "./Stats";

export class PlayerControler extends ScriptComponent {
    constructor() {
        super("player_contoler")
    }


    private timePassed: number = 0;
    private ticks: number = 0;
    private deathWait: number = 0.8;
    private isDead: boolean = false;
    private sprite: SpriteComponent | undefined
    private colider: Colider | undefined

    private currentAnim: number = 0;
    private animTicks: number = 0;

    public lives: number = 3;
    public score: number = 0;

    public state: number = 0

    public invurneable: boolean = true;
    private gunManager: GunManager | undefined

    private cmap = 0;

    onInit = () => {
        this.sprite = this.entity.getComponent(RendnerComponent.type) as SpriteComponent
        this.colider = this.entity.getComponent(Colider.type) as Colider
        this.gunManager = this.entity.getComponent("gunmanager") as GunManager
        this.entity.transform = new Vec2(-60, Constants.WORLD_MIN_Y + 60)
        Stats(Runtime.EntityManager!)
    }

    onTick = () => {
        this.timePassed += Runtime.deltaTime!;
        this.ticks++;

        if (this.isDead && this.timePassed >= this.deathWait) {
            this.isDead = false;
            this.timePassed = 0;
        }
        if (!this.isDead && this.timePassed >= 4.5) {
            this.invurneable = false;
            this.colider!.enabled = true;
            this.sprite?.applyPallet(ColorPallets.RED)
            this.cmap = 0;
        }

        if (this.invurneable && this.ticks % 3 == 0) {
            let pal = undefined;
            this.cmap++;
            this.cmap = this.cmap % 4
            switch (this.cmap) {
                case 0:
                    pal = ColorPallets.BLUE;
                    break;
                case 1:
                    pal = ColorPallets.GREEN;
                    break;
                case 2:
                    pal = ColorPallets.PINK;
                    break;
                case 3:
                    pal = ColorPallets.YELLOW;
                    break;
                default:
                    pal = ColorPallets.RED;
                    break;
            }
            this.sprite?.applyPallet(pal)
        }

        if (!this.isDead) {
            switch (this.state) {
                case 0:
                    this.comeInTic();
                    break
                case 1:
                    this.normalTick();
                    break;
                case 2:
                    this.moveToPoint()
                    break;
            }
        }
    }

    private helpVec: Vec2 | undefined;
    moveToPoint() {
        if (!this.helpVec) {
            this.helpVec = (new Vec2(160, 60)).add(this.entity.transform.opposite())
            if (this.helpVec.magnitude > 10) this.helpVec = this.helpVec.multiplyScalar(0.3)
            this.gunManager?.disable()
            this.sprite!.frame = 0
            Runtime.GlobalStorage.set("currentScore", this.score);
        }
        if (!(this.entity.transform.x > 158 && this.entity.transform.x < 162 && this.entity.transform.y < 62 && this.entity.transform.y > 58)) {
            this.entity.transform = this.entity.transform.add(this.helpVec.multiplyScalar(Runtime.deltaTime!))
        } else {
            //waiting for ship
            this.state = 3;
        }

    }

    comeInTic() {
        this.entity.transform = this.entity.transform.add(new Vec2(120, 0).multiplyScalar(Runtime.deltaTime!))
        if (this.entity.transform.x >= 80) {
            this.state = 1;
        }
    }

    normalTick() {
        this.currentAnim = 0;
        if (Runtime.Input.up) {
            if (this.entity.transform.y > Constants.WORLD_MIN_Y + 15) {
                this.entity.transform.y -= 3;
            }
            this.currentAnim = 1;
        }
        if (Runtime.Input.down) {
            if (this.entity.transform.y < Constants.WORLD_MAX_Y - Constants.PLAYER_SIZE.y - 15) {
                this.entity.transform.y += 3;
            }
            this.currentAnim = 2;
        }
        if (Runtime.Input.left) {
            if (this.entity.transform.x > 0) {
                this.entity.transform.x -= 3;
            }
            this.currentAnim = 3;
        }
        if (Runtime.Input.right) {
            if (this.entity.transform.x < Constants.WORLD_MAX_X - Constants.PLAYER_SIZE.x) {
                this.entity.transform.x += 3;
            }
            this.currentAnim = 4;
        }
        if ((Runtime.Input.left && Runtime.Input.right) || (Runtime.Input.up && Runtime.Input.down)) {
            this.currentAnim = 0;
        }

        this.timePassed += Runtime.deltaTime!;

        this.animTicks++;
        switch (this.currentAnim) {
            case 0:
                this.playNormalAnim();
                break;
            case 1:
                this.playAnimUp();
                break
            case 2:
                this.playAnimDown();
                break
            case 3:
                this.playAnimLeft();
                break
            case 4:
                this.playAnimForward();
                break
        }
    }

    playNormalAnim() {
        if (this.animTicks % 3 == 0) {
            this.sprite!.frame = this.sprite!.frame == 1 ? 0 : 1
        }
    }

    animFrame = 0;
    playAnimUp() {
        if (this.animTicks % 3 == 0) {
            this.animFrame = this.animFrame >= 4 ? 0 : this.animFrame + 1;
            this.sprite!.frame = 2 + this.animFrame - 1;
        }
    }

    playAnimDown() {
        this.sprite!.frame = 11;
    }

    playAnimLeft() {
        if (this.animTicks % 3 == 0) {
            this.sprite!.frame = this.sprite!.frame == 11 ? 10 : 11
        }
    }

    animFrameForward = 0;
    playAnimForward() {
        if (this.sprite!.frame < 6 || this.sprite!.frame > 10) {
            this.animFrame = 0;
        }
        if (this.animTicks % 3 == 0) {
            this.sprite!.frame = 6 + this.animFrame;
            this.animFrame++;
            if (this.animFrame == 4) {
                this.animFrame = 2
            }
        }
    }

    die() {
        const e = Explosion(Runtime.EntityManager!)
        e.transform = this.entity.transform.clone()
        this.state = 0;
        this.entity.transform.x = -16
        this.invurneable = true
        this.timePassed = 0;
        this.isDead = true;
        this.colider!.enabled = false;
        this.sprite!.frame = 0;
        this.lives--;
        this.gunManager!.degradeGun()
        //summon exposion

        if (this.lives == 0) {
            Runtime.GlobalStorage.set("currentScore", this.score);
            Runtime.SceneManager?.setScene("game_over")
        }
    }


    onCollision = (colider: Colider) => {
        if (this.state < 2) {
            if ((colider.entity.hasTag("enemy_bullet") || colider.entity.hasTag("enemy") || colider.entity.name == "world") && !this.invurneable) {
                this.die();
            }
            if (colider.entity.hasTag("item") && colider.entity.hasTag(Items.HP)) {
                this.lives = this.lives < 5 ? this.lives + 1 : this.lives;
            }
        }
    }

}