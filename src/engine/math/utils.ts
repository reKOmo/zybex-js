export function randomNumberInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
}