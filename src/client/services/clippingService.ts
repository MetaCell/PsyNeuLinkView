import {MetaLinkModel, MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel} from "@projectstorm/react-diagrams-core";
import {Point, Rectangle} from "@projectstorm/geometry";
import ModelSingleton from "../model/ModelSingleton";
import {getClippingHelper} from "../model/clipping/ClippingHelper";


export function getClipPath(parent: MetaNodeModel | null, child: MetaNodeModel | null) {
    if (!parent || !child) {
        return null;
    }

    const childClippingHelper = getClippingHelper(child);
    const childBB = childClippingHelper.getBoundingBox(child)

    const parentClippingHelper = getClippingHelper(parent);
    const parentBB = parentClippingHelper.getBoundingBox(parent)

    const outsideData = getOutsideData(parentBB, childBB);
    if (!outsideData) {
        return null
    }

    const {left, top, right, bottom} = childClippingHelper.getClipPath(childBB, outsideData)

    // Workaround for issue with the first render
    if (left === 0 && top === 0 && right === 0 && bottom === 0) {
        return null;
    }

    // Convert the polygon vertex coordinates to a string representation that can be used as a CSS value
    return getClipPathStr(left, top, right, bottom)
}

/**
 * Calculates the outside data of a child node or link relative to its parent node.
 * @param parentBoundingBox
 * @param childBoundingBox
 * @returns {DirectionalData | null} - Returns the outside data of the child relative to its parent.
 */
export function getOutsideData(parentBoundingBox: Rectangle, childBoundingBox: Rectangle) {
    if (!parentBoundingBox || !childBoundingBox) {
        return null
    }

    let parentLeft = parentBoundingBox.getLeftMiddle().x;
    let parentRight = parentBoundingBox.getRightMiddle().x;
    let parentTop = parentBoundingBox.getTopMiddle().y;
    let parentBottom = parentBoundingBox.getBottomMiddle().y;

    let childLeft = childBoundingBox.getLeftMiddle().x
    let childRight = childBoundingBox.getRightMiddle().x;
    let childTop = childBoundingBox.getTopMiddle().y;
    let childBottom = childBoundingBox.getBottomMiddle().y;

    return {
        left: Math.max(0, parentLeft - childLeft),
        right: Math.max(0, childRight - parentRight),
        top: Math.max(0, parentTop - childTop),
        bottom: Math.max(0, childBottom - parentBottom)
    };
}


export function extractCoordinatesFromClipPath(clipPath: string) {
    const coordinates = clipPath.match(/-?\d+(?:\.\d+)?/g);
    if (coordinates && coordinates.length === 8) {
        return {
            left: Number(coordinates[0]),
            top: Number(coordinates[1]),
            right: Number(coordinates[4]),
            bottom: Number(coordinates[5])
        };
    }
    return null;
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
        const parentBoundingBox = parentClippingHelper.getBoundingBox(node)

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
