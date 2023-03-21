import {MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel, PortModel} from "@projectstorm/react-diagrams-core";
import {Point} from "@projectstorm/geometry";

/**
 * Calculates the amount by which the child element extends beyond the parent element in each direction (left, right, top, bottom).
 * @param parentElement The parent element.
 * @param childElement The child element.
 * @returns An object containing the bounding boxes of the parent and child elements, and the amount by which the child extends beyond the parent in each direction.
 */
export function getOutsideData(parentElement: Element, childElement: Element) {
    if(!parentElement || !childElement){
        return null
    }
    const parentBoundingBox = parentElement.getBoundingClientRect();
    const childBoundingBox = childElement.getBoundingClientRect();

    const outsideData = {
        left: Math.max(0, parentBoundingBox.left - childBoundingBox.left),
        right: Math.max(0, childBoundingBox.right - parentBoundingBox.right),
        top: Math.max(0, parentBoundingBox.top - childBoundingBox.top),
        bottom: Math.max(0, childBoundingBox.bottom - parentBoundingBox.bottom)
    };
    return {childBoundingBox, parentBoundingBox, outsideData};
}

/**
 * Calculates the amount by which a border of the child element should be offset based on how much the child extends beyond the parent in each direction.
 * @param outsideData An object containing the amount by which the child extends beyond the parent in each direction.
 * @param borderSize The size of the border.
 * @returns An object containing the amount by which each border should be offset.
 */
function getBorderOffset(outsideData: { top: number; left: number; bottom: number; right: number }, borderSize: number) {
    const rightBorderOffset = outsideData.right > 0 ? borderSize : 0
    const leftBorderOffset = outsideData.left > 0 ? borderSize : 0
    const topBorderOffset = outsideData.top > 0 ? borderSize : 0
    const bottomBorderOffset = outsideData.bottom > 0 ? borderSize : 0
    return {rightBorderOffset, leftBorderOffset, topBorderOffset, bottomBorderOffset};
}

/**

 Returns a string representation of a polygon with the specified coordinates.
 @param left - The x-coordinate of the left vertex.
 @param top - The y-coordinate of the top vertex.
 @param right - The x-coordinate of the right vertex.
 @param bottom - The y-coordinate of the bottom vertex.
 @returns A string representation of a polygon with the specified coordinates.
 */

function getClipPathStr(left: number, top: number, right: number, bottom: number) {
    return `polygon(${left}px ${top}px, ${right}px ${top}px,${right}px ${bottom}px, ${left}px ${bottom}px)`;
}

/**

 Calculates the distance between the child element's bottom edge and the bottom edge of the parent element, taking into account the size of the parent element's border and a scale factor.
 @param childBoundingBox - The child element's bounding box.
 @param outsideData - An object with the amount by which the child element overflows each side of the parent element.
 @param bottomBorderOffset - The offset of the parent element's bottom border.
 @param scaleFactor - A scale factor to apply to the distance calculation.
 @returns The distance between the child element's bottom edge and the bottom edge of the parent element.
 */

function getBottom(childBoundingBox: DOMRect, outsideData: { top: number; left: number; bottom: number; right: number }, bottomBorderOffset: number, scaleFactor: number) {
    return (childBoundingBox.height - outsideData.bottom - bottomBorderOffset) / scaleFactor;
}

/**

 Calculates the distance between the child element's right edge and the right edge of the parent element, taking into account the size of the parent element's border and a scale factor.
 @param childBoundingBox - The child element's bounding box.
 @param outsideData - An object with the amount by which the child element overflows each side of the parent element.
 @param rightBorderOffset - The offset of the parent element's right border.
 @param scaleFactor - A scale factor to apply to the distance calculation.
 @returns The distance between the child element's right edge and the right edge of the parent element.
 */


function getRight(childBoundingBox: DOMRect, outsideData: { top: number; left: number; bottom: number; right: number }, rightBorderOffset: number, scaleFactor: number) {
    return (childBoundingBox.width - outsideData.right - rightBorderOffset) / scaleFactor;
}

/**

 Calculates the x and y coordinates of the top-left corner of the clip path, taking into account the size of the parent element's border and a scale factor.
 @param outsideData - An object with the amount by which the child element overflows each side of the parent element.
 @param leftBorderOffset - The offset of the parent element's left border.
 @param scaleFactor - A scale factor to apply to the distance calculation.
 @param topBorderOffset - The offset of the parent element's top border.
 @returns An object containing the x and y coordinates of the top-left corner of the clip path.
 */

function getLeftTop(outsideData: { top: number; left: number; bottom: number; right: number }, leftBorderOffset: number, scaleFactor: number, topBorderOffset: number) {
    const left = (outsideData.left + leftBorderOffset) / scaleFactor;
    const top = (outsideData.top + topBorderOffset) / scaleFactor;
    return {left, top};
}

/**
 * Returns a clip path as a string for a child element to be clipped by its parent element.
 *
 * @param {Element | null} parentElement - The parent element to clip the child element.
 * @param {Element | null} childElement - The child element to be clipped by its parent element.
 * @param {number} borderSize - The size of the border of the child element.
 * @param {number} scaleFactor - The scaling factor for the clip path.
 *
 * @returns {string | null} A string representing the polygon clip path or null if either parent or child element is null.
 */
export function getClipPath(parentElement: Element | null, childElement: Element | null, borderSize: number, scaleFactor: number) {
    if(!parentElement || !childElement){
        return null;
    }
    const outsideData = getOutsideData(parentElement, childElement);
    if (!outsideData){
        return null
    }
    const {
        rightBorderOffset,
        leftBorderOffset,
        topBorderOffset,
        bottomBorderOffset
    } = getBorderOffset(outsideData.outsideData, borderSize);
    const {left, top} = getLeftTop(outsideData.outsideData, leftBorderOffset, scaleFactor, topBorderOffset);
    const right = getRight(outsideData.childBoundingBox, outsideData.outsideData, rightBorderOffset, scaleFactor);
    const bottom = getBottom(outsideData.childBoundingBox, outsideData.outsideData, bottomBorderOffset, scaleFactor);

    // Convert the polygon vertex coordinates to a string representation that can be used as a CSS value
    return getClipPathStr(left, top, right, bottom);
}

export function isAnyDirectionOutside(outsideData: { top: number; left: number; bottom: number; right: number }) {
    return outsideData.top > 0 || outsideData.bottom > 0 || outsideData.left > 0 || outsideData.right > 0;
}

/**
 * Returns the ID of the parent node for a given node in the meta diagram.
 * If the node is at the top level, returns itself
 * @param node The node for which to get the parent ID.
 * @returns The ID of the parent node.
 */

export function getParentNodeId(node: MetaNodeModel) {
    return node.getGraphPath().length === 1 ? node.getGraphPath()[0] : node.getGraphPath()[node.getGraphPath().length - 2]
}

/**
 * Returns a PointModel representing the nearest point on the parent to a given link's port
 * @param parent The parent node to find the nearest border point on.
 * @param originalPort The original source or target port of the link.
 * @param link The link
 * @returns A PointModel representing the nearest port on the parent node's border.
 */
export function getNearestParentPointModel(parent: MetaNodeModel, originalPort: PortModel, link: any){
    let yPos = originalPort.getY()
    let xPos = originalPort.getX()
    // port is on the left side of the node
    if (originalPort.getX() < parent.getX()){
        xPos = parent.getX()
    }
    // port is on the right side of the node
    if (originalPort.getX() > parent.getX() + parent.width){
        xPos = parent.getX() + parent.width
    }
    // port is on the top of the node
    if (originalPort.getY() < parent.getY()){
        yPos = parent.getY()
    }
    // port is on the bottom of the node
    if (originalPort.getY() > parent.getY() + parent.height){
        yPos = parent.getY() + parent.height
    }
    return  new PointModel({
        link: link,
        position: new Point(xPos, yPos)
    })
}