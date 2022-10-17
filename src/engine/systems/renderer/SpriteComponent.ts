import { ColorPallet } from "./ColorPallet";
import { RendnerComponent } from "./RenderComponent";

class SpriteComponent extends RendnerComponent {
    constructor(spritesheet: any, w?: number, h?: number, srcW?: number, srcH?: number) {
        super();
        this.spriteSheet = spritesheet as HTMLImageElement;
        this.coloredSpiteSheet = (spritesheet as HTMLImageElement).cloneNode() as HTMLImageElement;
        this.w = w ? w : this.spriteSheet.width;
        this.h = h ? h : this.spriteSheet.height;
        this.srcW = srcW ? srcW : this.w;
        this.srcH = srcH ? srcH : this.h;
    }

    private spriteSheet: HTMLImageElement;
    private coloredSpiteSheet: HTMLImageElement;
    private w: number;
    private h: number;
    private srcW: number;
    private srcH: number;
    public frame: number = 0;
    private isReset: boolean = true;

    public applyPallet(pallet: ColorPallet) {
        this.isReset = false;
        const can = document.createElement("canvas");
        can.width = this.spriteSheet.width;
        can.height = this.spriteSheet.height;
        const ctx = can.getContext("2d");
        //ctx!.fillStyle = `#${hexColor}`
        //ctx!.fillRect(0, 0, this.srcW, this.srcH);

        //ctx!.globalCompositeOperation = "destination-in";
        ctx?.drawImage(this.spriteSheet, 0, 0);

        const imgData = ctx!.getImageData(0, 0, this.spriteSheet.width, this.spriteSheet.height);

        for (let i = 0; i < imgData.data.length; i += 4) {
            const grayscale = Math.floor((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);
            const newValue = pallet.getMapping(grayscale);

            if (newValue) {
                imgData.data[i] = newValue.r
                imgData.data[i + 1] = newValue.g
                imgData.data[i + 2] = newValue.b
            }

        }

        ctx?.putImageData(imgData, 0, 0)

        this.coloredSpiteSheet.src = can.toDataURL();
    }

    public resetSprite() {
        if (!this.isReset) {
            this.coloredSpiteSheet = this.spriteSheet.cloneNode() as HTMLImageElement;
            this.isReset = true;
        }
    }

    onTick = (context: CanvasRenderingContext2D) => {
        context.drawImage(this.coloredSpiteSheet, 0, this.srcH * this.frame, this.srcW, this.srcH, this.entity.absoluteTransform.x, this.entity.absoluteTransform.y, this.w, this.h)
    };

}

export { SpriteComponent }