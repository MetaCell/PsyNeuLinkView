import {MetaLinkModel, MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel} from "@projectstorm/react-diagrams-core";
import {Point, Rectangle} from "@projectstorm/geometry";
import ModelSingleton from "../model/ModelSingleton";
import {
    clipPathParentBorderSize,
    clipPathSelectedBorder,
    clipPathTopAdjustment, PNLMechanisms,
    snapshotDimensionsLabel
} from "../../constants";
import {getHTMLElementFromMetaNodeModel} from "../utils";


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

    const parentBoundingBox = getParentBoundingBoxWithClipPath(parent)
    const childBoundingBox = child.getBoundingBox();

    let {
        childTopAdjustment,
        childSelectedBorderAdjustment,
        parentBorderAdjustment
    } = getAdjustments(child, parent);

    return {
        left: Math.max(0, (parentBoundingBox.getTopLeft().x + parentBorderAdjustment) - childBoundingBox.getTopLeft().x),
        right: Math.max(0, (childBoundingBox.getTopRight().x + childSelectedBorderAdjustment) - (parentBoundingBox.getTopRight().x - parentBorderAdjustment)),
        top: Math.max(0, (parentBoundingBox.getTopLeft().y + parentBorderAdjustment) - (childBoundingBox.getTopLeft().y + childTopAdjustment)),
        bottom: Math.max(0, (childBoundingBox.getBottomLeft().y + childSelectedBorderAdjustment) - (parentBoundingBox.getBottomLeft().y - parentBorderAdjustment))
    };
}

function getAdjustments(child: MetaNodeModel | MetaLinkModel, parent: MetaNodeModel) {
    let childTopAdjustment = 0
    let childSelectedBorderAdjustment = 0
    // Adjustments are only considered when the child is selected
    // @ts-ignore
    if (isSelectedMechanism(child)) {
        // Adjustment to make the show properties button visible
        childTopAdjustment = clipPathTopAdjustment;
        // Adjustment to make the selected border visible
        childSelectedBorderAdjustment = clipPathSelectedBorder;
    }

    // Adjustment to make exclude the parent border from the bounding box
    let parentBorderAdjustment = clipPathParentBorderSize
    // if in detached mode then there's no border
    if (parent.getOption(snapshotDimensionsLabel)) {
        parentBorderAdjustment = 0
    }
    return {childTopAdjustment, childSelectedBorderAdjustment, parentBorderAdjustment};
}

function getParentBoundingBoxWithClipPath(parent: MetaNodeModel) {
    const parentBoundingBox = parent.getBoundingBox();
    const parentPosition = parent.getPosition()
    const parentElement = getHTMLElementFromMetaNodeModel(parent);
    const parentClipPath = parentElement ? parentElement.style.clipPath : null;

    if (parentClipPath) {
        const parentCoords = extractCoordinatesFromClipPath(parentClipPath);
        if (parentCoords) {
            const newLeft = parentPosition.x + parentCoords.left;
            const newTop = parentPosition.y + parentCoords.top;
            const newWidth = parentCoords.right - parentCoords.left;
            const newHeight = parentCoords.bottom - parentCoords.top;
            return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
        }
    }

    // If there is no clipPath or coordinates can't be extracted, return original bounding box
    return parentBoundingBox;
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


function extractCoordinatesFromClipPath(clipPath: string) {
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

    if (isSelectedMechanism(child)) {
        top += clipPathTopAdjustment
        right += clipPathSelectedBorder
        bottom += clipPathSelectedBorder
    }

    // Workaround for issue with the first render
    if (left === 0 && top === 0 && right === 0 && bottom === 0) {
        return null;
    }

    // Convert the polygon vertex coordinates to a string representation that can be used as a CSS value
    return getClipPathStr(left, top, right, bottom)
}

function isSelectedMechanism(element: MetaNodeModel | MetaLinkModel) {
    // @ts-ignore
    return element.getOptions().shape === PNLMechanisms.MECHANISM && element.getOptions().selected;
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
