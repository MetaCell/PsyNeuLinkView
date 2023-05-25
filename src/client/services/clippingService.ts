import {MetaLinkModel, MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel, PortModel} from "@projectstorm/react-diagrams-core";
import {Point} from "@projectstorm/geometry";
import ModelSingleton from "../model/ModelSingleton";
import {clipPathParentBorderSize, clipPathSelectedBorder, clipPathTopAdjustment} from "../../constants";


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
    if (child.getOptions().selected) {
        // Style adjustments
        topAdjustment = clipPathTopAdjustment;
        borderAdjustment = clipPathSelectedBorder;
    }

    const parentBoundingBox = parent.getBoundingBox();
    const childBoundingBox = child.getBoundingBox();

    return {
        left: Math.max(0, (parentBoundingBox.getTopLeft().x + clipPathParentBorderSize) - childBoundingBox.getTopLeft().x),
        right: Math.max(0, (childBoundingBox.getTopRight().x + borderAdjustment) - (parentBoundingBox.getTopRight().x - clipPathParentBorderSize)),
        top: Math.max(0, (parentBoundingBox.getTopLeft().y + clipPathParentBorderSize) - (childBoundingBox.getTopLeft().y + topAdjustment)),
        bottom: Math.max(0, (childBoundingBox.getBottomLeft().y + borderAdjustment) - (parentBoundingBox.getBottomLeft().y - clipPathParentBorderSize))
    };
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


export function getClipPath(parent: MetaNodeModel | null, child: MetaNodeModel | null) {
    if (!parent || !child) {
        return null;
    }
    const outsideData = getOutsideData(parent, child);
    if (!outsideData) {
        return null
    }

    const childBB = child.getBoundingBox();

    const {left} = outsideData
    let top = outsideData.top
    let right = childBB.getWidth() - outsideData.right
    let bottom = childBB.getHeight() - outsideData.bottom

    if (child.getOptions().selected) {
        top += clipPathTopAdjustment
        right += clipPathSelectedBorder
        bottom += clipPathSelectedBorder
    }

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
        xPos = parent.getX() + clipPathParentBorderSize
    }
    // port is on the right side of the node
    if (position.x > parent.getX() + parent.width) {
        xPos = parent.getX() + parent.width - clipPathParentBorderSize
    }
    // port is on the top of the node
    if (position.y < parent.getY()) {
        yPos = parent.getY() + clipPathParentBorderSize
    }
    // port is on the bottom of the node
    if (position.y > parent.getY() + parent.height) {
        yPos = parent.getY() + parent.height - clipPathParentBorderSize
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