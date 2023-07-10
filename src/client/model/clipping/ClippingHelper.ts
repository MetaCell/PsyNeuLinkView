import {MetaNodeModel} from "@metacell/meta-diagram";
import {Rectangle} from "@projectstorm/geometry";
import ModelSingleton from "../ModelSingleton";
import {getClippingHelper} from "./ClippingHelperFactory";
import {getClippingOffsets, getIntersectionOfBoundingBoxes} from "./utils";

export interface ClipPathProvider {
    getClipPath(): ClipPathData;
    getVisibleBoundingBox(): Rectangle;
}

export abstract class ClippingHelper implements ClipPathProvider {
    protected readonly unclippedBoundingBox: Rectangle;
    protected readonly visibleBoundingBox: Rectangle;

    constructor(node: MetaNodeModel) {
        this.unclippedBoundingBox = this.calculateUnclippedBoundingBox(node);
        this.visibleBoundingBox = this.calculateVisibleBoundingBox(node);
    }

    getOutsideData(): DirectionalData {
        return getClippingOffsets(this.unclippedBoundingBox, this.visibleBoundingBox);
    }

    getVisibleBoundingBox(): Rectangle {
        return this.visibleBoundingBox;
    }

    abstract getClipPath(): ClipPathData;

    protected abstract calculateUnclippedBoundingBox(node: MetaNodeModel): Rectangle;

    protected calculateVisibleBoundingBox(node: MetaNodeModel): Rectangle {
        const parentNode = ModelSingleton.getInstance()
            .getMetaGraph()
            .getParent(node);

        if (parentNode) {
            const parentClippingHelper = getClippingHelper(parentNode);
            const parentBoundingBox = parentClippingHelper.getVisibleBoundingBox();
            return getIntersectionOfBoundingBoxes(this.unclippedBoundingBox, parentBoundingBox);
        }

        return this.unclippedBoundingBox;
    }
}



