import {Point, Rectangle} from "@projectstorm/geometry";

export function getIntersectionOfBoundingBoxes(boxA: Rectangle, boxB: Rectangle) {
    let left = Math.max(boxA.getLeftMiddle().x, boxB.getLeftMiddle().x);
    let right = Math.min(boxA.getRightMiddle().x, boxB.getRightMiddle().x);
    let top = Math.max(boxA.getTopMiddle().y, boxB.getTopMiddle().y);
    let bottom = Math.min(boxA.getBottomMiddle().y, boxB.getBottomMiddle().y);
    let width = right - left;
    let height = bottom - top;

    return new Rectangle(new Point(left, top), width, height);
}

export function getClippingOffsets(unclippedBox: Rectangle, visibleBox: Rectangle): DirectionalData {
    return {
        left: Math.max(0, visibleBox.getLeftMiddle().x - unclippedBox.getLeftMiddle().x),
        right: Math.max(0, unclippedBox.getRightMiddle().x - visibleBox.getRightMiddle().x),
        top: Math.max(0, visibleBox.getTopMiddle().y - unclippedBox.getTopMiddle().y),
        bottom: Math.max(0, unclippedBox.getBottomMiddle().y - visibleBox.getBottomMiddle().y)
    };
}
