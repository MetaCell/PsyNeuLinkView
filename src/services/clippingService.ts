import {MetaLinkModel, MetaNodeModel} from "@metacell/meta-diagram";
import {PointModel, PortModel} from "@projectstorm/react-diagrams-core";
import {Point} from "@projectstorm/geometry";

export function getOutsideData(parent: MetaNodeModel, child: MetaNodeModel | MetaLinkModel) {
    if(!parent || !child){
        return null
    }
    const parentBoundingBox = parent.getBoundingBox();
    const childBoundingBox = child.getBoundingBox();

    if(!childBoundingBox){
        return null
    }

    return {
        left: Math.max(0, parentBoundingBox.getTopLeft().x - childBoundingBox.getTopLeft().x),
        right: Math.max(0, childBoundingBox.getTopRight().x - parentBoundingBox.getTopRight().x),
        top: Math.max(0, parentBoundingBox.getTopLeft().y - childBoundingBox.getTopLeft().y),
        bottom: Math.max(0, childBoundingBox.getBottomLeft().y - parentBoundingBox.getBottomLeft().y)
    }
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

function getBottom(outsideData: { top: number; left: number; bottom: number; right: number }, height: number, bottomBorderOffset: number) {
    return (height - outsideData.bottom - bottomBorderOffset);
}

function getRight(outsideData: { top: number; left: number; bottom: number; right: number }, width: number, rightBorderOffset: number) {
    return (width - outsideData.right - rightBorderOffset);
}

function getLeftTop(outsideData: { top: number; left: number; bottom: number; right: number }, leftBorderOffset: number, topBorderOffset: number) {
    const left = (outsideData.left + leftBorderOffset) ;
    const top = (outsideData.top + topBorderOffset);
    return {left, top};
}



export function getClipPath(parent: MetaNodeModel | null, child: MetaNodeModel | MetaLinkModel | null, borderSize: number) {
    if(!parent || !child){
        return null;
    }
    const outsideData = getOutsideData(parent, child);
    if (!outsideData){
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

    const {left, top} = getLeftTop(outsideData, leftBorderOffset, topBorderOffset);
    const right = getRight(outsideData, childWidth, rightBorderOffset);
    const bottom = getBottom(outsideData, childHeight, bottomBorderOffset);

    // Workaround for issue with the first render
    if (left== 0 && top== 0 && right== 0 && bottom== 0){
        // Convert the polygon vertex coordinates to a string representation that can be used as a CSS value
        return null;
    }
    return getClipPathStr(left, top, right, bottom);
}

export function isAnyDirectionOutside(outsideData: { top: number; left: number; bottom: number; right: number }) {
    if(!outsideData){
        return false
    }
    return outsideData.top > 0 || outsideData.bottom > 0 || outsideData.left > 0 || outsideData.right > 0;
}

export function getParentNodeId(node: MetaNodeModel) {
    return node.getGraphPath().length === 1 ? node.getGraphPath()[0] : node.getGraphPath()[node.getGraphPath().length - 2]
}

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