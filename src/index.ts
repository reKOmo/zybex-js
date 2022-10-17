import { Main } from "./engine/core/Main";
import { MediaTypes } from "./engine/core/media/Media";
import { Project } from "./engine/core/project/Project";
import { Scene } from "./engine/core/scene/Scene";
import { GameOver } from "./scripts/GameOver";
import { HallOfFame } from "./scripts/HallOfFame";
import { LevelManager } from "./scripts/level/LevelManager";
import { MainMenu } from "./scripts/MainMenu";
import { SaveMenu } from "./scripts/SaveScore";
import { ShowScore } from "./scripts/ShowScore";
import { WaitLevel } from "./scripts/WaitForLevel";

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', '/assets/font/a.ttf');
document.head.appendChild(link);

start()

function start() {
    const a = document.createElement("div");
    a.focus()
    a.style.width = (200 * 4) + 'px';
    // a.style.height = (160 * 4) + 'px';
    document.body.appendChild(a);

    const p = new Project()
    p.rootElement = a
    p.tps = 60
    p.resolution.x = 320
    p.resolution.y = 224

    p.media = [
        { name: "diskSprite", src: "/assets/diskEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "enemyBasicBullet", src: "/assets/bullets/enemy_basic_bullet.png", type: MediaTypes.IMAGE },
        { name: "spikeSprite", src: "/assets/spikeEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "squashingSprite", src: "/assets/squashingEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "wormSprite", src: "/assets/wormEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "ufoSprite", src: "/assets/ufoEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "thinSprite", src: "/assets/thinEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "blockSprite", src: "/assets/blockEnemy/sprite.png", type: MediaTypes.IMAGE },
        { name: "level1", src: "/assets/levels/1.png", type: MediaTypes.IMAGE },
        { name: "player_sprite", src: "/assets/player/sprite.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_basic", src: "/assets/bullets/player_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_railgun", src: "/assets/bullets/railgun_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_pulse", src: "/assets/bullets/pulse_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_bullet_pulse_short", src: "/assets/bullets/pulse_short_bullet.png", type: MediaTypes.IMAGE },
        { name: "player_explosion", src: "/assets/player/explosion.png", type: MediaTypes.IMAGE },
        { name: "enemy_explosion", src: "/assets/enemy/explosion.png", type: MediaTypes.IMAGE },
        { name: "hud_guns", src: "/assets/hud/guns.png", type: MediaTypes.IMAGE },
        { name: "weapon_level", src: "/assets/hud/weapon_level.png", type: MediaTypes.IMAGE },
        { name: "hp_icon", src: "/assets/enemy/hp_drop.png", type: MediaTypes.IMAGE },
        { name: "space_ship", src: "/assets/player/space_ship.png", type: MediaTypes.IMAGE },
        { name: "game_over", src: "/assets/menus/game_over.png", type: MediaTypes.IMAGE },
        { name: "main_menu", src: "/assets/menus/main.png", type: MediaTypes.IMAGE },
        { name: "wait_menu", src: "/assets/menus/wait_for_level.png", type: MediaTypes.IMAGE },
        { name: "save_score", src: "/assets/menus/save_score.png", type: MediaTypes.IMAGE },
        { name: "hallOfFame", src: "/assets/menus/hall_of_fame.png", type: MediaTypes.IMAGE },
        { name: "show_score", src: "/assets/menus/show_score.png", type: MediaTypes.IMAGE },
    ]

    const s1 = new Scene("main")
    p.addScene(s1);


    s1.sceneCreator = (mgr) => {
        //! World must be first for colliders to work correctly
        //TODO make coliders more generic
        LevelManager(mgr);
    }

    const s2 = new Scene("game_over")
    p.addScene(s2);


    s2.sceneCreator = (mgr) => {
        GameOver(mgr);
    }

    const s3 = new Scene("main_menu")
    p.addScene(s3);


    s3.sceneCreator = (mgr) => {
        MainMenu(mgr);
    }

    const s4 = new Scene("wait_for_level")
    p.addScene(s4);


    s4.sceneCreator = (mgr) => {
        WaitLevel(mgr);
    }

    const s5 = new Scene("save_menu")
    p.addScene(s5);


    s5.sceneCreator = (mgr) => {
        SaveMenu(mgr);
    }

    const s6 = new Scene("hall_of_fame")
    p.addScene(s6);


    s6.sceneCreator = (mgr) => {
        HallOfFame(mgr);
    }
    const s7 = new Scene("show_score")
    p.addScene(s7);


    s7.sceneCreator = (mgr) => {
        ShowScore(mgr);
    }

    p.keyMapping = [
        { event: "up", keys: ["w", "ArrowUp"] },
        { event: "left", keys: ["a", "ArrowLeft"] },
        { event: "down", keys: ["s", "ArrowDown"] },
        { event: "right", keys: ["d", "ArrowRight"] },
        { event: "enter", keys: [" ", "Control"] }
    ]

    p.startScene = "main_menu"

    const main = new Main(p);
    main.load();
    main.start();

}
