import {MetaNodeModel} from "@metacell/meta-diagram";
import {Rectangle} from "@projectstorm/geometry";
import ModelSingleton from "../ModelSingleton";
import {getClippingHelper} from "./ClippingHelperFactory";
import {getClippingOffsets, getIntersectionOfBoundingBoxes} from "./utils";


/**
 * Interface that provides the methods to get clip path and visible bounding box.
 */
export interface ClipPathProvider {
    getClipPath(): ClipPathData;
    getVisibleBoundingBox(): Rectangle;
}

/**
 * Abstract class that implements the ClipPathProvider interface and provides some common properties and methods
 * used for handling the clipping of nodes.
 */
export abstract class ClippingHelper implements ClipPathProvider {
    protected readonly unclippedBoundingBox: Rectangle;
    protected readonly visibleBoundingBox: Rectangle;

    constructor(node: MetaNodeModel) {
        this.unclippedBoundingBox = this.calculateUnclippedBoundingBox(node);
        this.visibleBoundingBox = this.calculateVisibleBoundingBox(node);
    }

    /**
     * Gets the clipping offsets from the unclipped to the visible bounding box.
     * @returns {DirectionalData} The clipping offsets.
     */
    getOutsideData(): DirectionalData {
        return getClippingOffsets(this.unclippedBoundingBox, this.visibleBoundingBox);
    }
    /**
     * Gets the visible bounding box of the node.
     * @returns {Rectangle} The visible bounding box.
     */
    getVisibleBoundingBox(): Rectangle {
        return this.visibleBoundingBox;
    }

    /**
     * Abstract method to get the clip path of the node.
     * @abstract
     * @returns {ClipPathData} The clip path data.
     */
    abstract getClipPath(): ClipPathData;

    /**
     * Abstract method to calculate the unclipped bounding box of the node.
     * @abstract
     * @param {MetaNodeModel} node - The node to calculate the bounding box for.
     * @returns {Rectangle} The unclipped bounding box.
     */
    protected abstract calculateUnclippedBoundingBox(node: MetaNodeModel): Rectangle;

    /**
     * Calculates the visible bounding box of the node, considering the bounding box of the parent node.
     * @param {MetaNodeModel} node - The node to calculate the visible bounding box for.
     * @returns {Rectangle} The visible bounding box.
     */
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



