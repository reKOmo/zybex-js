class MediaStorage {
    private _media: Map<string, any> = new Map();

    getMedia(name: string): any {
        return this._media.get(name);
    }

    setMedia(name: string, media: any) {
        this._media.set(name, media)
    }
}

export { MediaStorage }