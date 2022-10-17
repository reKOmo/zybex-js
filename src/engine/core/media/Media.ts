interface Media {
    name: string,
    src: string,
    type: MediaTypes
}

enum MediaTypes {
    TEXT,
    JSON,
    IMAGE,
    AUDIO,
    BLOB,
}

export { Media, MediaTypes }