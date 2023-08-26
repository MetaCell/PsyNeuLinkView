
import {MetaNodeModel} from "@metacell/meta-diagram";
import {Point, Rectangle} from "@projectstorm/geometry";
import {MECHANISM_BORDER_SIZE, MECHANISM_TOP_CHIP_ADJUSTMENT} from "../../../constants";
import {ClippingHelper} from "./ClippingHelper";

export class MechanismClippingHelper extends ClippingHelper {
    getClipPath(): ClipPathData {
        const outsideData = this.getOutsideData()

        const minX = outsideData.left
        const minY = outsideData.top - MECHANISM_TOP_CHIP_ADJUSTMENT
        const maxX = minX + this.unclippedBoundingBox.getWidth() - outsideData.right
        const maxY = this.unclippedBoundingBox.getHeight() - outsideData.bottom - MECHANISM_TOP_CHIP_ADJUSTMENT

        return {minX, minY, maxX, maxY}
    }

    protected calculateUnclippedBoundingBox(mechanism: MetaNodeModel): Rectangle {
        const mechanismBoundingBox = mechanism.getBoundingBox();

        let newLeft = mechanismBoundingBox.getLeftMiddle().x - MECHANISM_BORDER_SIZE;
        let newTop = mechanismBoundingBox.getTopMiddle().y - MECHANISM_BORDER_SIZE - MECHANISM_TOP_CHIP_ADJUSTMENT;
        let newWidth = mechanismBoundingBox.getRightMiddle().x + MECHANISM_BORDER_SIZE - newLeft;
        let newHeight = mechanismBoundingBox.getBottomMiddle().y + MECHANISM_BORDER_SIZE - newTop;

        return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
    }
}