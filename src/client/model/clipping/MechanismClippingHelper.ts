
import {MetaNodeModel} from "@metacell/meta-diagram";
import {Point, Rectangle} from "@projectstorm/geometry";
import {mechanismBorder, mechanismTopChipAdjustment} from "../../../constants";
import {ClippingHelper} from "./ClippingHelper";

export class MechanismClippingHelper extends ClippingHelper {
    getClipPath(): ClipPathData {
        const outsideData = this.getOutsideData()

        const minX = outsideData.left
        const minY = outsideData.top - mechanismTopChipAdjustment
        const maxX = minX + this.unclippedBoundingBox.getWidth() - outsideData.right
        const maxY = this.unclippedBoundingBox.getHeight() - outsideData.bottom - mechanismTopChipAdjustment

        return {minX, minY, maxX, maxY}
    }

    protected calculateUnclippedBoundingBox(mechanism: MetaNodeModel): Rectangle {
        const mechanismBoundingBox = mechanism.getBoundingBox();

        let newLeft = mechanismBoundingBox.getLeftMiddle().x - mechanismBorder;
        let newTop = mechanismBoundingBox.getTopMiddle().y - mechanismBorder - mechanismTopChipAdjustment;
        let newWidth = mechanismBoundingBox.getRightMiddle().x + mechanismBorder - newLeft;
        let newHeight = mechanismBoundingBox.getBottomMiddle().y + mechanismBorder - newTop;

        return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
    }
}