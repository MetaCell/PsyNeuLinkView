import {MetaLinkModel, MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel, PortModel} from "@projectstorm/react-diagrams-core";
import {Point} from "@projectstorm/geometry";
import ModelSingleton from "../model/ModelSingleton";
import {clipPathBorderSize} from "../../constants";


/**
 * Checks if the given child is completely outside the parent.
 * @param {MetaNodeModel} parent - The parent node.
 * @param {MetaNodeModel | MetaLinkModel} child - The child node or link.
 * @returns {boolean | null} - Returns true if the child is completely outside the parent, false otherwise. Returns null if parent or child is not provided.
 */
export function isCompletelyOutside(parent: MetaNodeModel, child: MetaNodeModel | MetaLinkModel) {
    if (!parent || !child) {
        return null
    }
    const parentBoundingBox = parent.getBoundingBox();
    const childBoundingBox = child.getBoundingBox();

    return childBoundingBox.getTopRight().x < parentBoundingBox.getTopLeft().x || // Child is to the left of parent
        childBoundingBox.getTopLeft().x > parentBoundingBox.getTopRight().x || // Child is to the right of parent
        childBoundingBox.getTopLeft().y > parentBoundingBox.getBottomLeft().y || // Child is above parent
        childBoundingBox.getBottomLeft().y < parentBoundingBox.getTopLeft().y; // Child is below parent

}

/**
 * Checks if the given outsideData indicates that the child node is outside its parent node in any direction.
 * @param {DirectionalData} outsideData - The outside data of a child node or link relative to its parent.
 * @returns {boolean} - Returns true if the child is outside its parent node in any direction, false otherwise.
 */

export function isAnyDirectionOutside(outsideData: DirectionalData) {
    if (!outsideData) {
        return false
    }
    return outsideData.top > 0 || outsideData.bottom > 0 || outsideData.left > 0 || outsideData.right > 0;
}

/**
 * Calculates the outside data of a child node or link relative to its parent node.
 * @param {MetaNodeModel} parent - The parent node.
 * @param {MetaNodeModel | MetaLinkModel} child - The child node or link.
 * @returns {DirectionalData | null} - Returns the outside data of the child relative to its parent. Returns null if parent or child is not provided, or if the child has no bounding box.
 */
export function getOutsideData(parent: MetaNodeModel, child: MetaNodeModel | MetaLinkModel) {
    if (!parent || !child) {
        return null
    }

    let topAdjustment = 0
    let borderAdjustment = 0


    // Adjustments are only considered when the child is selected
    if (child.getOption('selected')) {
        // Style adjustments
        topAdjustment = -42;  // converted from -2.625rem
        borderAdjustment = 1.5;  // converted from 0.09375rem
    }

    const parentBoundingBox = parent.getBoundingBox();
    const childBoundingBox = child.getBoundingBox();

    return {
        left: Math.max(0, parentBoundingBox.getTopLeft().x - childBoundingBox.getTopLeft().x),
        right: Math.max(0, childBoundingBox.getTopRight().x - parentBoundingBox.getTopRight().x),
        top: Math.max(0, parentBoundingBox.getTopLeft().y - (childBoundingBox.getTopLeft().y + topAdjustment)) + topAdjustment,
        bottom: Math.max(0, childBoundingBox.getBottomLeft().y - parentBoundingBox.getBottomLeft().y)
    };
}

/**
 * Calculates the border offset based on outside data and the provided border size.
 * @param {DirectionalData} outsideData - The outside data of a child node or link relative to its parent.
 * @param {number} borderSize - The size of the border.
 * @returns {{rightBorderOffset: number, leftBorderOffset: number, topBorderOffset: number, bottomBorderOffset: number}} - Returns an object containing the border offset values.
 */

function getBorderOffset(outsideData: DirectionalData, borderSize: number) {
    const rightBorderOffset = outsideData.right > 0 ? borderSize : 0
    const leftBorderOffset = outsideData.left > 0 ? borderSize : 0
    const topBorderOffset = outsideData.top > 0 ? borderSize : 0
    const bottomBorderOffset = outsideData.bottom > 0 ? borderSize : 0
    return {rightBorderOffset, leftBorderOffset, topBorderOffset, bottomBorderOffset};
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
 * Calculates the bottom value for the clip path based on outside data, height, and bottom border offset.
 * @param {DirectionalData} outsideData - The outside data of a child node or link relative to its parent.
 * @param {number} height - The height of the child node or link.
 * @param {number} bottomBorderOffset - The bottom border offset.
 * @returns {number} - Returns the bottom value for the clip path.
 */
function getBottom(outsideData: DirectionalData, height: number, bottomBorderOffset: number) {
    return (height - outsideData.bottom - bottomBorderOffset);
}

/**
 * Calculates the right value for the clip path based on outside data,
 * width, and right border offset.
 *
 * @param {DirectionalData} outsideData - The outside data of a child node or link relative to its parent.
 * @param {number} width - The width of the child node or link.
 * @param {number} rightBorderOffset - The right border offset.
 * @returns {number} - Returns the right value for the clip path.
 * */
function getRight(outsideData: DirectionalData, width: number, rightBorderOffset: number) {
    return (width - outsideData.right - rightBorderOffset);
}

/**

 Calculates the left value for the clip path based on outside data and left border offset.
 @param {DirectionalData} outsideData - The outside data of a child node or link relative to its parent.
 @param {number} leftBorderOffset - The left border offset.
 @returns {number} - Returns the left value for the clip path.
 */
function getLeft(outsideData: DirectionalData, leftBorderOffset: number) {
    return (outsideData.left + leftBorderOffset);
}

/**

 Calculates the top value for the clip path based on outside data and top border offset.
 @param {DirectionalData} outsideData - The outside data of a child node or link relative to its parent.
 @param {number} topBorderOffset - The top border offset.
 */
function getTop(outsideData: DirectionalData, topBorderOffset: number) {
    return (outsideData.top + topBorderOffset);
}


export function getClipPath(parent: MetaNodeModel | null, child: MetaNodeModel | null, borderSize: number = 0) {
    if (!parent || !child) {
        return null;
    }
    const outsideData = getOutsideData(parent, child);
    if (!outsideData) {
        return null
    }
    const {
        rightBorderOffset,
        leftBorderOffset,
        topBorderOffset,
        bottomBorderOffset
    } = getBorderOffset(outsideData, borderSize);

    const childBB = child.getBoundingBox();
    const childWidth = childBB.getWidth()
    const childHeight = childBB.getHeight()
    const top = getTop(outsideData, topBorderOffset);
    const left = getLeft(outsideData, leftBorderOffset);
    const right = getRight(outsideData, childWidth, rightBorderOffset);
    const bottom = getBottom(outsideData, childHeight, bottomBorderOffset);

    // Workaround for issue with the first render
    if (left == 0 && top == 0 && right == 0 && bottom == 0) {
        // Convert the polygon vertex coordinates to a string representation that can be used as a CSS value
        return null;
    }
    return getClipPathStr(left, top, right, bottom)
}

/**
 * Gets the nearest parent point model based on the original port, considering input/output buffers.
 * @param {MetaNodeModel} parent - The parent node.
 * @param {PortModel} position - The original port associated with the link.
 * @returns {Point} - Returns the nearest parent point.
 */
export function getNearestParentPointModel(parent: MetaNodeModel, position: Point) {
    let yPos = position.y
    let xPos = position.x
    // port is on the left side of the node
    if (position.x < parent.getX()) {
        xPos = parent.getX() + clipPathBorderSize
    }
    // port is on the right side of the node
    if (position.x > parent.getX() + parent.width) {
        xPos = parent.getX() + parent.width - clipPathBorderSize
    }
    // port is on the top of the node
    if (position.y < parent.getY()) {
        yPos = parent.getY() + clipPathBorderSize
    }
    // port is on the bottom of the node
    if (position.y > parent.getY() + parent.height) {
        yPos = parent.getY() + parent.height - clipPathBorderSize
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
    if (parentNode && !parentNode.getBoundingBox().containsPoint(pointModel.getPosition())) {
        pointModel.setPosition(getNearestParentPointModel(parentNode, pointModel.getPosition()));
        return true
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