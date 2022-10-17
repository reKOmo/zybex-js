import { ColorPallet } from "../engine/systems/renderer/ColorPallet"

export const Constants = {
    WORLD_SPEED: 40,
    WORLD_TILE_SIZE: 20,
    PLAYER_SIZE: { x: 16, y: 18 },
    WORLD_MAX_X: 320,
    WORLD_MAX_Y: 176,
    WORLD_MIN_Y: 16,

}

export const ColorPallets = {
    GREEN: new ColorPallet({ selectorValue: 59, to: { r: 0, g: 59, b: 0 } }, { selectorValue: 134, to: { r: 0, g: 134, b: 43 } }, { selectorValue: 230, to: { r: 97, g: 230, b: 154 } }),
    RED: new ColorPallet({ selectorValue: 59, to: { r: 7, g: 42, b: 0 } }, { selectorValue: 134, to: { r: 131, g: 41, b: 0 } }, { selectorValue: 230, to: { r: 210, g: 163, b: 58 } }, { selectorValue: 255, to: { r: 255, g: 182, b: 140 } }),
    YELLOW: new ColorPallet({ selectorValue: 59, to: { r: 96, g: 67, b: 51 } }, { selectorValue: 134, to: { r: 210, g: 121, b: 76 } }, { selectorValue: 230, to: { r: 207, g: 177, b: 62 } }, { selectorValue: 255, to: { r: 252, g: 252, b: 152 } }),
    BLUE: new ColorPallet({ selectorValue: 59, to: { r: 54, g: 73, b: 153 } }, { selectorValue: 134, to: { r: 73, g: 141, b: 208 } }, { selectorValue: 230, to: { r: 108, g: 123, b: 242 } }, { selectorValue: 255, to: { r: 161, g: 168, b: 211 } }),
    PINK: new ColorPallet({ selectorValue: 59, to: { r: 7, g: 7, b: 106 } }, { selectorValue: 134, to: { r: 172, g: 66, b: 172 } }, { selectorValue: 230, to: { r: 221, g: 76, b: 221 } }, { selectorValue: 255, to: { r: 248, g: 161, b: 248 } }),
}