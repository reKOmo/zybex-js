import { EntityManager } from "../../../engine/core/entity/EntityManager";
import { Runtime } from "../../../engine/runtime/Runtime";
import { ScriptComponent } from "../../../engine/systems/script_processor/ScriptComponent";
import { BlockBunchController } from "./BlockBunchController";

export abstract class BlockBaseController extends ScriptComponent {
    abstract go: Function;
    protected control: BlockBunchController | undefined
    onInit = () => {
        this.control = Runtime.EntityManager!.getEntity("blockBunchController")?.getComponent("blockBunchController") as BlockBunchController;
    };
}