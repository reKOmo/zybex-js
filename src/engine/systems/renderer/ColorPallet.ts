export class ColorPallet {
    constructor(...args: ColorMapping[]) {
        args.forEach(m => {
            this.map.set(m.selectorValue, m.to)
        })
    }

    private map: Map<number, Color> = new Map()

    getMapping(value: number): Color | undefined {
        const c = this.map.get(value)
        return c;
    }
}

export interface ColorMapping {
    selectorValue: number,
    to: Color
}

export interface Color {
    r: number,
    g: number,
    b: number
}