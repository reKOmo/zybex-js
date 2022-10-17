abstract class System {
    abstract onInit: () => void;
    abstract onTick: () => void;

}

export { System }