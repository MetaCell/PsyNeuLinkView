import {ClippingHelper} from "./ClippingHelper";
import {MetaNodeModel} from "@metacell/meta-diagram";
import {Point, Rectangle} from "@projectstorm/geometry";
import {clipPathCompositionBorderSize, compositionTopChipAdjustment} from "../../../constants";
import {getHTMLElementFromMetaNodeModel} from "../../utils";
import {extractCoordinatesFromClipPath} from "../../services/clippingService";
import composition from "../../components/views/editView/compositions/Composition";

export class CompositionClippingHelper implements ClippingHelper {
    getClipPath(boundingBox: Rectangle, outsideData: DirectionalData): DirectionalData {
        const left = outsideData.left
        const top = outsideData.top - compositionTopChipAdjustment
        const right = boundingBox.getWidth() - outsideData.right + clipPathCompositionBorderSize
        const bottom = boundingBox.getHeight() - outsideData.bottom + clipPathCompositionBorderSize - compositionTopChipAdjustment

        return {left, top, right, bottom}
    }

    getBoundingBox(composition: MetaNodeModel): Rectangle {
        const compositionElement = getHTMLElementFromMetaNodeModel(composition);
        const clipPath = compositionElement ? compositionElement.style.clipPath : null;
        const boundingBox = this.getUnclippedBoundingBox(composition)
        if (!clipPath) {
            return boundingBox
        }
        const clipPathCoords = extractCoordinatesFromClipPath(clipPath);
        if (!clipPathCoords) {
            return boundingBox
        }

        // todo:
        return boundingBox
    }




    getUnclippedBoundingBox(composition: MetaNodeModel): Rectangle {
        // doesn't include borders nor the top chip
        const compositionBoundingBox = composition.getBoundingBox();

        let newLeft = compositionBoundingBox.getLeftMiddle().x;
        let newTop = compositionBoundingBox.getTopMiddle().y;
        let newWidth = compositionBoundingBox.getRightMiddle().x - clipPathCompositionBorderSize - newLeft;
        let newHeight = compositionBoundingBox.getBottomMiddle().y - clipPathCompositionBorderSize - newTop;

        return new Rectangle(new Point(newLeft, newTop), newWidth, newHeight)
    }
}