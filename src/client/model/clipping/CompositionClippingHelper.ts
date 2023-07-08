import {ClippingHelper} from "./ClippingHelper";
import {MetaNodeModel} from "@metacell/meta-diagram";
import {Point, Rectangle} from "@projectstorm/geometry";
import {compositionBorderSize, compositionTopChipAdjustment} from "../../../constants";
import ModelSingleton from "../ModelSingleton";
import {getIntersectionOfBoundingBoxes} from "../utils";

export class CompositionClippingHelper implements ClippingHelper {
    getClipPath(boundingBox: Rectangle, outsideData: DirectionalData): DirectionalData {
        const left = outsideData.left > 0 ? outsideData.left + compositionBorderSize : outsideData.left;
        const top = outsideData.top > 0
            ? outsideData.top + compositionBorderSize
            : outsideData.top - compositionTopChipAdjustment;
        const right = boundingBox.getWidth() - outsideData.right + (outsideData.right > 0 ? 0 : compositionBorderSize);
        const bottom = boundingBox.getHeight() - outsideData.bottom + (outsideData.bottom > 0 ? 0 : compositionBorderSize);

        return { left, top, right, bottom };
    }

    getBoundingBox(composition: MetaNodeModel): Rectangle {
        const parentNode = ModelSingleton.getInstance()
            .getMetaGraph()
            .getParent(composition);

        const unclippedBoundingBox = this.getUnclippedBoundingBox(composition)

        if (parentNode) {
            const parentBoundingBox = this.getBoundingBox(parentNode);
            return getIntersectionOfBoundingBoxes(unclippedBoundingBox, parentBoundingBox);
        }
        return unclippedBoundingBox;
    }




    getUnclippedBoundingBox(composition: MetaNodeModel): Rectangle {
        // doesn't include borders nor the top chip
        const compositionBoundingBox = composition.getBoundingBox();

        let newLeft = compositionBoundingBox.getLeftMiddle().x;
        let newTop = compositionBoundingBox.getTopMiddle().y;
        let newWidth = compositionBoundingBox.getRightMiddle().x - compositionBorderSize - newLeft;
        let newHeight = compositionBoundingBox.getBottomMiddle().y - compositionBorderSize - newTop;

        return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
    }
}