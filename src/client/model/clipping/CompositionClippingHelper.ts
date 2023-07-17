
import {MetaNodeModel} from "@metacell/meta-diagram";
import {Point, Rectangle} from "@projectstorm/geometry";
import {COMPOSITION_BORDER_SIZE, COMPOSITION_TOP_CHIP_ADJUSTMENT} from "../../../constants";
import {ClippingHelper} from "./ClippingHelper";

export class CompositionClippingHelper extends ClippingHelper {
    getClipPath(): ClipPathData {
        const outsideData = this.getOutsideData();

        const minX = outsideData.left > 0 ? outsideData.left + COMPOSITION_BORDER_SIZE : outsideData.left;
        const minY = outsideData.top > 0
            ? outsideData.top + COMPOSITION_BORDER_SIZE
            : outsideData.top - COMPOSITION_TOP_CHIP_ADJUSTMENT;
        const maxX = this.unclippedBoundingBox.getWidth() - outsideData.right + (outsideData.right > 0 ? 0 : COMPOSITION_BORDER_SIZE);
        const maxY = this.unclippedBoundingBox.getHeight() - outsideData.bottom + (outsideData.bottom > 0 ? 0 : COMPOSITION_BORDER_SIZE);

        return {minX, minY, maxX, maxY};
    }

    protected calculateUnclippedBoundingBox(composition: MetaNodeModel): Rectangle {
        const compositionBoundingBox = composition.getBoundingBox();

        let newLeft = compositionBoundingBox.getLeftMiddle().x;
        let newTop = compositionBoundingBox.getTopMiddle().y;
        let newWidth = compositionBoundingBox.getRightMiddle().x - COMPOSITION_BORDER_SIZE - newLeft;
        let newHeight = compositionBoundingBox.getBottomMiddle().y - COMPOSITION_BORDER_SIZE - newTop;

        return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
    }
}