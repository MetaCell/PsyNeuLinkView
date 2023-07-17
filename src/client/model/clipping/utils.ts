import {Point, Rectangle} from "@projectstorm/geometry";

/**
 * Calculate the intersection of two bounding boxes.
 * @param {Rectangle} boxA - The first bounding box.
 * @param {Rectangle} boxB - The second bounding box.
 * @returns {Rectangle} The intersection of boxA and boxB.
 */
export function getIntersectionOfBoundingBoxes(boxA: Rectangle, boxB: Rectangle) {
    let left = Math.max(boxA.getLeftMiddle().x, boxB.getLeftMiddle().x);
    let right = Math.min(boxA.getRightMiddle().x, boxB.getRightMiddle().x);
    let top = Math.max(boxA.getTopMiddle().y, boxB.getTopMiddle().y);
    let bottom = Math.min(boxA.getBottomMiddle().y, boxB.getBottomMiddle().y);
    let width = right - left;
    let height = bottom - top;

    return new Rectangle(new Point(left, top), width, height);
}

/**
 * Calculate the clipping offsets between an unclipped and a visible bounding box.
 * @param {Rectangle} unclippedBox - The unclipped bounding box.
 * @param {Rectangle} visibleBox - The visible bounding box.
 * @returns {DirectionalData} The clipping offsets in each direction.
 */
export function getClippingOffsets(unclippedBox: Rectangle, visibleBox: Rectangle): DirectionalData {
    return {
        left: Math.max(0, visibleBox.getLeftMiddle().x - unclippedBox.getLeftMiddle().x),
        right: Math.max(0, unclippedBox.getRightMiddle().x - visibleBox.getRightMiddle().x),
        top: Math.max(0, visibleBox.getTopMiddle().y - unclippedBox.getTopMiddle().y),
        bottom: Math.max(0, unclippedBox.getBottomMiddle().y - visibleBox.getBottomMiddle().y)
    };
}
