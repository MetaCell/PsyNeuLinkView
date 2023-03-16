import {MetaNodeModel} from "@metacell/meta-diagram";

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

function getBorderOffset(outsideData: { top: number; left: number; bottom: number; right: number }, borderSize: number) {
    const rightBorderOffset = outsideData.right > 0 ? borderSize : 0
    const leftBorderOffset = outsideData.left > 0 ? borderSize : 0
    const topBorderOffset = outsideData.top > 0 ? borderSize : 0
    const bottomBorderOffset = outsideData.bottom > 0 ? borderSize : 0
    return {rightBorderOffset, leftBorderOffset, topBorderOffset, bottomBorderOffset};
}

function getClipPathStr(left: number, top: number, right: number, bottom: number) {
    return `polygon(${left}px ${top}px, ${right}px ${top}px,${right}px ${bottom}px, ${left}px ${bottom}px)`;
}

function getBottom(childBoundingBox: DOMRect, outsideData: { top: number; left: number; bottom: number; right: number }, bottomBorderOffset: number, scaleFactor: number) {
    return (childBoundingBox.height - outsideData.bottom - bottomBorderOffset) / scaleFactor;
}

function getRight(childBoundingBox: DOMRect, outsideData: { top: number; left: number; bottom: number; right: number }, rightBorderOffset: number, scaleFactor: number) {
    return (childBoundingBox.width - outsideData.right - rightBorderOffset) / scaleFactor;
}

function getLeftTop(outsideData: { top: number; left: number; bottom: number; right: number }, leftBorderOffset: number, scaleFactor: number, topBorderOffset: number) {
    const left = (outsideData.left + leftBorderOffset) / scaleFactor;
    const top = (outsideData.top + topBorderOffset) / scaleFactor;
    return {left, top};
}

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

export function getParentNodeId(node: MetaNodeModel) {
    return node.getGraphPath().length === 1 ? node.getGraphPath()[0] : node.getGraphPath()[node.getGraphPath().length - 2]
}