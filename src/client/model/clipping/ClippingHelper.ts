import {MetaNodeModel} from "@metacell/meta-diagram";
import {Rectangle} from "@projectstorm/geometry";
import {isComposition, isMechanism} from "../graph/utils";
import {MechanismClippingHelper} from "./MechanismClippingHelper";
import {CompositionClippingHelper} from "./CompositionClippingHelper";

export interface ClippingHelper {
    getClipPath(boundingBox: Rectangle, outsideData: DirectionalData): DirectionalData;
    getBoundingBox(node: MetaNodeModel): Rectangle;
}

export function getClippingHelper(node: MetaNodeModel): ClippingHelper {
    if (isMechanism(node)) {
        return new MechanismClippingHelper();
    } else if (isComposition(node)) {
        return new CompositionClippingHelper();
    } else {
        throw new Error(`Unsupported node type: ${typeof node}`);
    }
}