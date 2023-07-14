import {MetaLinkModel, MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel} from "@projectstorm/react-diagrams-core";
import {Point, Rectangle} from "@projectstorm/geometry";
import ModelSingleton from "../model/ModelSingleton";
import {getClippingHelper} from "../model/clipping/ClippingHelperFactory";


/**
 * Returns the CSS `clip-path` property value for a given node that when applied makes the node show only its visible area
 * @param {MetaNodeModel} node - The node for which the `clip-path` is to be computed.
 * @returns {string|null} The `clip-path` property value or null if the node bounds are all zero.
 */
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
 * Returns a string representation of the `clip-path` property value for the given bounds.
 * @param {number} minX - The minX bound of the node.
 * @param {number} minY - The minY bound of the node.
 * @param {number} maxX - The right bound of the node.
 * @param {number} maxY - The bottom bound of the node.
 * @returns {string} The `clip-path` property value.
 */
function getClipPathStr(minX: number, minY: number, maxX: number, maxY: number) {
    return `polygon(${minX}px ${minY}px, ${maxX}px ${minY}px,${maxX}px ${maxY}px, ${minX}px ${maxY}px)`;
}

/**
 * Returns the nearest point on the parent bounding box from the given position.
 * @param {Rectangle} parentBoundingBox - The parent node's bounding box.
 * @param {Point} position - The position for which the nearest point on the parent bounding box is to be found.
 * @returns {Point} The nearest point on the parent bounding box.
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
 * Updates the link points of a node.
 * @param {MetaNodeModel} node - The node for which the link points are to be updated.
 * @param {PointModel} pointModel - The point model representing the link's position.
 * @returns {boolean} True if the link points were updated, false otherwise.
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

/**
 * Calculates the edge point on the boundary of a circular node in the direction of a given target point (typically the center).
 * @param {Point} center - The center of the node.
 * @param {Point} target - The target point.
 * @param {number} radius - The radius of the node.
 * @param {MetaLinkModel} link - The link for which the edge point is to be calculated.
 * @returns {PointModel} The edge point on the node boundary.
 */
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
