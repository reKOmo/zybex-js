import { ColorPallets, Constants } from "../Constants";
import { Items } from "../item/Items";
import { Level } from "./Level";

export const Levels: Level[] = [
    {
        enemies: [
            { type: 0, yLevel: 60, dropItems: [Items.BASIC_GUN, Items.BASIC_GUN, Items.RAIL_GUN] },
            { type: 0, yLevel: 100 }, { type: 1 },
            { type: 1 },
            { type: 3, yLevel: 50, dropItems: [Items.HP, Items.HP, Items.HP] }, { type: 1 },
            { type: 0, yLevel: 50, dropItems: [Items.HP, Items.HP, Items.RAIL_GUN] },
            { type: 5, yLevel: 50 },
            { type: 5, yLevel: 50, dropItems: [Items.HP, Items.HP] },
            { type: 4, yLevel: 50 },
            { type: 2 },
            { type: 0, dropItems: [Items.EWAY_GUN, Items.BASIC_GUN, Items.PULS_GUN] },
            { type: 8 },
            { type: 2 },
            { type: 7, dropItems: [Items.EWAY_GUN, Items.BASIC_GUN, Items.PULS_GUN] },
            { type: 3 },
            { type: 0, yLevel: 50, dropItems: [Items.HP, Items.EWAY_GUN, Items.RAIL_GUN] },
            { type: 1 },
            { type: 9 },
            { type: 10 },
        ],
        levelMapId: "level1",
        colorPallet: ColorPallets.GREEN

    }
]