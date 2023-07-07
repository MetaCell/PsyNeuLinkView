import {ClippingHelper} from "./ClippingHelper";
import {MetaNodeModel} from "@metacell/meta-diagram";
import {Point, Rectangle} from "@projectstorm/geometry";
import {clipPathSelectedMechanismBorder, mechanismTopChipAdjustment} from "../../../constants";

export class MechanismClippingHelper implements ClippingHelper {
    getClipPath(boundingBox: Rectangle, outsideData: DirectionalData): DirectionalData {

        const left = outsideData.left
        const top = -mechanismTopChipAdjustment + outsideData.top
        const right = boundingBox.getWidth() - outsideData.right
        const bottom = boundingBox.getHeight() - outsideData.bottom - mechanismTopChipAdjustment

        return {left, top, right, bottom}
    }

    getBoundingBox(mechanism: MetaNodeModel): Rectangle {
        // includes borders and show properties chip
        const mechanismBoundingBox = mechanism.getBoundingBox();

        let newLeft = mechanismBoundingBox.getLeftMiddle().x - clipPathSelectedMechanismBorder;
        let newTop = mechanismBoundingBox.getTopMiddle().y - clipPathSelectedMechanismBorder - mechanismTopChipAdjustment;
        let newWidth = mechanismBoundingBox.getRightMiddle().x + clipPathSelectedMechanismBorder - newLeft;
        let newHeight = mechanismBoundingBox.getBottomMiddle().y + clipPathSelectedMechanismBorder - newTop;

        return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
    }
}