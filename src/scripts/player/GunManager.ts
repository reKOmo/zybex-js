import { Entity } from "../../engine/core/entity/Entity";
import { EntityManager } from "../../engine/core/entity/EntityManager";
import { Vec2 } from "../../engine/math/Vec2";
import { Runtime } from "../../engine/runtime/Runtime";
import { Colider } from "../../engine/systems/colision/Colider";
import { ScriptComponent } from "../../engine/systems/script_processor/ScriptComponent";
import { AutoGun } from "../bullets/AutoGun";
import { BasicBullet } from "../bullets/BasicBullet";
import { Gun } from "../bullets/Gun";
import { Items } from "../item/Items";
import { GunHud } from "./GunHud";
import { EwGun } from "./guns/8wayGun";
import { PulseGun } from "./guns/PulseGun";
import { RailGun } from "./guns/RailGun";

export class GunManager extends ScriptComponent {
    constructor() {
        super("gunmanager")
    }
    private basicGun: AutoGun | undefined;
    private railGun: Gun | undefined;
    private pulseGun: Gun | undefined;
    private ewGun: Gun | undefined;
    public gunLevels: number[] = [1, 1, 1, 1]
    public selectedGun: number = 0;
    private gunArr: (Gun | undefined | AutoGun)[] = []
    public enabledGuns: boolean[] = [true, true, true, true]
    private gunchanged: boolean = false;
    onInit = () => {
        //createGuns
        const bg = new AutoGun((mgr: EntityManager) => { return this.basicBullet(mgr) })
        this.entity.addComponent(bg)
        bg.bulletVector = new Vec2(450, 0)
        bg.maxBullets = 3;
        bg.timeBetweenBullets = 0.1
        this.basicGun = bg;
        bg.enabled = true;
        this.gunArr.push(this.basicGun)
        this.basicGunUp()

        //railgun
        const railg = new RailGun()
        this.entity.addComponent(railg)
        this.railGun = railg;
        railg.enabled = false;
        this.gunArr.push(this.railGun)

        //pulsegun
        const pulseg = new PulseGun()
        this.entity.addComponent(pulseg)
        this.pulseGun = pulseg;
        pulseg.enabled = false
        this.gunArr.push(this.pulseGun)

        //8waygun
        const ewg = new EwGun()
        this.entity.addComponent(ewg)
        this.ewGun = ewg;
        ewg.enabled = false
        this.gunArr.push(this.ewGun)

        //HUD
        GunHud(Runtime.EntityManager!, this)
    };

    disable() {
        this.gunArr[this.selectedGun]!.enabled = false;
        this.enabled = false;
    }

    public degradeGun() {
        this.gunLevels[this.selectedGun]--;
        if (this.gunLevels[this.selectedGun] == 0) {
            if (this.selectedGun == 0) this.gunLevels[this.selectedGun] = 1
            else {
                this.enabledGuns[this.selectedGun] = false;
                this.gunArr[this.selectedGun]!.enabled = false
                this.gunArr[this.selectedGun]!.bulletsAlive = 0;
                do {
                    this.selectedGun++;
                    this.selectedGun = this.selectedGun % this.gunArr.length;
                } while (!this.enabledGuns[this.selectedGun])
                this.gunArr[this.selectedGun]!.enabled = true
            }
        }
        this.basicGunUp()
    }

    onTick = () => {
        if (Runtime.Input.enter && !this.gunchanged) {
            let prevIndex = this.selectedGun;
            let prevBullets = this.gunArr[this.selectedGun]!.bulletsAlive
            this.gunArr[this.selectedGun]!.enabled = false
            this.gunArr[this.selectedGun]!.bulletsAlive = 0;
            do {
                this.selectedGun++;
                this.selectedGun = this.selectedGun % this.gunArr.length;
            } while (!this.enabledGuns[this.selectedGun])
            this.gunArr[this.selectedGun]!.enabled = true
            if (this.selectedGun == 0) {
                this.basicGun!.enabled = true;
            }
            this.gunchanged = true;
            if (this.selectedGun != prevIndex) {
                Runtime.EntityManager?.getEntitesByTag("player_bullet").forEach(e => e.deleteSelf())
            } else {
                this.gunArr[this.selectedGun]!.bulletsAlive = prevBullets
            }
        } else if (!Runtime.Input.enter) {
            this.gunchanged = false;
        }
    };


    basicBullet(mgr: EntityManager) {
        const b: Entity = BasicBullet(Runtime.EntityManager!, this.basicGun as Gun);
        return b;
    }

    basicGunUp() {
        switch (this.gunLevels[0]) {
            case 1:
                this.basicGun!.maxBullets = 3;
                this.basicGun!.timeBetweenBullets = 0.1
                break
            case 2:
                this.basicGun!.maxBullets = 4;
                this.basicGun!.timeBetweenBullets = 0.1
                break
            case 3:
                this.basicGun!.maxBullets = 5;
                this.basicGun!.timeBetweenBullets = 0.05
                break
            case 4:
                this.basicGun!.maxBullets = 12;
                this.basicGun!.timeBetweenBullets = 0.02
                break
        }
    }

    onCollision = (colider: Colider) => {
        const e = colider.entity
        if (e.hasTag("item")) {
            if (e.hasTag(Items.BASIC_GUN)) {
                this.gunLevels[0] = this.gunLevels[0] < 4 ? this.gunLevels[0] + 1 : this.gunLevels[0];
                this.basicGunUp()

            } else if (e.hasTag(Items.EWAY_GUN)) {
                if (!this.enabledGuns[3]) this.enabledGuns[3] = true;
                this.ewGun!.level = this.ewGun!.level! + 1;
                this.gunLevels[3] = this.ewGun!.level
            } else if (e.hasTag(Items.RAIL_GUN)) {
                if (!this.enabledGuns[1]) this.enabledGuns[1] = true;
                this.railGun!.level = this.railGun!.level! + 1;
                this.gunLevels[1] = this.railGun!.level
            } else if (e.hasTag(Items.PULS_GUN)) {
                if (!this.enabledGuns[2]) this.enabledGuns[2] = true;
                this.pulseGun!.level = this.pulseGun!.level! + 1;
                this.gunLevels[2] = this.pulseGun!.level
            }
        }
    };

}