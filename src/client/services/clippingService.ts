import {MetaLinkModel, MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel} from "@projectstorm/react-diagrams-core";
import {Point, Rectangle} from "@projectstorm/geometry";
import ModelSingleton from "../model/ModelSingleton";
import {getClippingHelper} from "../model/clipping/ClippingHelperFactory";


export function getClipPath(node: MetaNodeModel) {

    const nodeClippingHelper = getClippingHelper(node);
    const {minX, minY, maxX, maxY} = nodeClippingHelper.getClipPath()

    // Workaround for issue with the first render
    if (minX === 0 && minY === 0 && maxX === 0 && maxY === 0) {
        return null;
    }

    // Convert the polygon vertex coordinates to a string representation that can be used as a CSS value
    return getClipPathStr(minX, minY, maxX, maxY)
}


/**
 * Constructs a clip path string from the given left, top, right, and bottom values.
 * @param {number} left - The left value.
 * @param {number} top - The top value.
 * @param {number} right - The right value.
 * @param {number} bottom - The bottom value.
 * @returns {string} - Returns a clip path string.
 */

function getClipPathStr(left: number, top: number, right: number, bottom: number) {
    return `polygon(${left}px ${top}px, ${right}px ${top}px,${right}px ${bottom}px, ${left}px ${bottom}px)`;
}



/**
 * Gets the nearest parent point model based on the original port, considering input/output buffers.
 * @param {Rectangle} parentBoundingBox - The parent bounding box.
 * @param {Point} position - The original port associated with the link.
 * @returns {Point} - Returns the nearest parent point.
 */
export function getNearestParentPointModel(parentBoundingBox: Rectangle, position: Point) {
    let yPos = position.y
    let xPos = position.x
    // port is on the left side of the node
    if (position.x < parentBoundingBox.getLeftMiddle().x) {
        xPos = parentBoundingBox.getLeftMiddle().x
    }
    // port is on the right side of the node
    if (position.x > parentBoundingBox.getRightMiddle().x) {
        xPos = parentBoundingBox.getRightMiddle().x
    }
    // port is on the top of the node
    if (position.y < parentBoundingBox.getTopMiddle().y) {
        yPos = parentBoundingBox.getTopMiddle().y
    }
    // port is on the bottom of the node
    if (position.y > parentBoundingBox.getBottomMiddle().y) {
        yPos = parentBoundingBox.getBottomMiddle().y
    }
    return new Point(xPos, yPos)
}


/**
 * Updates the point position to the nearestParentPoint if the point is outside the parent.
 * @param {MetaNodeModel} node - The node associated with the link.
 * @param {PointModel} pointModel - The point to update.
 * @returns {boolean} - Returns true if the point was updated
 */

export function updateLinkPoints(node: MetaNodeModel, pointModel: PointModel) {
    const parentNode = ModelSingleton.getInstance().getMetaGraph().getParent(node);
    if (parentNode) {

        const parentClippingHelper = getClippingHelper(node);
        const parentBoundingBox = parentClippingHelper.getVisibleBoundingBox()

        if (!parentBoundingBox.containsPoint(pointModel.getPosition())) {
            pointModel.setPosition(getNearestParentPointModel(parentBoundingBox, pointModel.getPosition()))
            return true
        }
    }
    return false
}

export function getEdgePoint(center: Point, target: Point, radius: number, link: MetaLinkModel) {
    // Calculate the direction of the link
    let dx = target.x - center.x;
    let dy = target.y - center.y;

    // Normalize the direction to have a length of 1
    let length = Math.sqrt(dx * dx + dy * dy);
    dx /= length;
    dy /= length;

    // Scale the direction by the radius of the node to get the edge point
    let edgeX = center.x + dx * radius;
    let edgeY = center.y + dy * radius;

    return new PointModel({
        link: link,
        position: new Point(edgeX, edgeY)
    });
}
