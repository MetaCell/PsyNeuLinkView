
import {MetaNodeModel} from "@metacell/meta-diagram";
import {Point, Rectangle} from "@projectstorm/geometry";
import {compositionBorderSize, compositionTopChipAdjustment} from "../../../constants";
import {ClippingHelper} from "./ClippingHelper";

export class CompositionClippingHelper extends ClippingHelper {
    getClipPath(): ClipPathData {
        const outsideData = this.getOutsideData();

        const minX = outsideData.left > 0 ? outsideData.left + compositionBorderSize : outsideData.left;
        const minY = outsideData.top > 0
            ? outsideData.top + compositionBorderSize
            : outsideData.top - compositionTopChipAdjustment;
        const maxX = this.unclippedBoundingBox.getWidth() - outsideData.right + (outsideData.right > 0 ? 0 : compositionBorderSize);
        const maxY = this.unclippedBoundingBox.getHeight() - outsideData.bottom + (outsideData.bottom > 0 ? 0 : compositionBorderSize);

        return {minX, minY, maxX, maxY};
    }

    protected calculateUnclippedBoundingBox(composition: MetaNodeModel): Rectangle {
        const compositionBoundingBox = composition.getBoundingBox();

        let newLeft = compositionBoundingBox.getLeftMiddle().x;
        let newTop = compositionBoundingBox.getTopMiddle().y;
        let newWidth = compositionBoundingBox.getRightMiddle().x - compositionBorderSize - newLeft;
        let newHeight = compositionBoundingBox.getBottomMiddle().y - compositionBorderSize - newTop;

        return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
    }
}