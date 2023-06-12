import {Point} from "@projectstorm/geometry";
import {clipPathSelectedBorder, clipPathTopAdjustment} from "../../../constants";
import ModelSingleton from "../ModelSingleton";
import {CallbackTypes} from "@metacell/meta-diagram";

function getWrapperDimensions(nodes) {
    if (nodes.length === 0) {
        return null;
    }

    let minX = nodes[0].position.x;
    let maxX = nodes[0].position.x + nodes[0].width;
    let minY = nodes[0].position.y;
    let maxY = nodes[0].position.y + nodes[0].height;

    nodes.forEach(node => {
        const x = node.position.x;
        const y = node.position.y;
        const width = node.width;
        const height = node.height;

        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x + width);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y + height);
    });

    const wrapperWidth = maxX + clipPathSelectedBorder - minX;
    const wrapperHeight = maxY + clipPathSelectedBorder - minY + Math.abs(clipPathTopAdjustment);
    const wrapperPosition = {x: minX, y: minY + clipPathTopAdjustment};

    return {
        width: wrapperWidth,
        height: wrapperHeight,
        position: wrapperPosition
    };
}

function updateDimensionsAndFireEvent(node, newDimensions) {
    node.updateDimensions(newDimensions);
    node.flagUpdate(CallbackTypes.NODE_RESIZED)
}

export function updateCompositionDimensions(composition, newDimensions, newPosition) {
    if(newPosition){
        composition.position = new Point(newPosition.x, newPosition.y);
    }
    updateDimensionsAndFireEvent(composition, newDimensions);


    const metaGraph = ModelSingleton.getInstance().getMetaGraph()
    let ancestor = metaGraph.getParent(composition);
    while (ancestor) {
        const {width, height, position} = getWrapperDimensions(metaGraph.getChildren(ancestor))
        if(ancestor.position.x !== position.x || ancestor.position.y !== position.y) {
            ancestor.position = new Point(position.x, position.y);
        }
        updateDimensionsAndFireEvent(ancestor, {width, height});
        ancestor = metaGraph.getParent(ancestor);
    }
}