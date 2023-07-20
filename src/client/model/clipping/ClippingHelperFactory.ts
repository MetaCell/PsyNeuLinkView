import {ClipPathProvider} from "./ClippingHelper";
import {MetaNodeModel} from "@metacell/meta-diagram";
import {isComposition, isMechanism} from "../graph/utils";
import {MechanismClippingHelper} from "./MechanismClippingHelper";
import {CompositionClippingHelper} from "./CompositionClippingHelper";

export function getClippingHelper(node: MetaNodeModel): ClipPathProvider {
    if (isMechanism(node)) {
        return new MechanismClippingHelper(node);
    } else if (isComposition(node)) {
        return new CompositionClippingHelper(node);
    } else {
        throw new Error(`Unsupported node type: ${typeof node}`);
    }
}