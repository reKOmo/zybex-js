import { Media, MediaTypes } from "./Media"
import { MediaStorage } from "./MediaStorage";

class MediaManager {
    private _mediaSrc: Media[] = [];
    private _media: MediaStorage = new MediaStorage();

    onItemLoaded: (itemsLoaded: number, totalItems: number) => void = () => { };
    onEnd = () => { }
    onStart = (totalItems: number) => { }

    set media(m: Media[]) {
        this._mediaSrc = m;
    }

    get MediaStorage(): MediaStorage {
        return this._media;
    }

    async loadMedia() {
        this.onStart(this._mediaSrc.length);
        let loadedItems = 0;
        for (let i = 0; i < this._mediaSrc.length; i++) {
            const m = this._mediaSrc[i];
            const res = await fetch(m.src);
            let data = undefined;
            switch (m.type) {
                case MediaTypes.TEXT:
                    data = await res.text();
                    break;
                case MediaTypes.JSON:
                    data = await res.json();
                    break;
                case MediaTypes.BLOB:
                    data = await res.blob();
                    break;
                case MediaTypes.IMAGE:
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const img = new Image();
                    img.src = url;
                    await img.decode();
                    data = img;
                    break;
                case MediaTypes.AUDIO:
                    const blob1 = await res.blob();
                    const url1 = URL.createObjectURL(blob1);
                    const audio = new Audio();
                    audio.src = url1;
                    data = audio;
                    break;
            }
            this._media.setMedia(m.name, data);
            this.onItemLoaded(++loadedItems, this._mediaSrc.length);
        }
        this.onEnd();
    }
}

export { MediaManager }