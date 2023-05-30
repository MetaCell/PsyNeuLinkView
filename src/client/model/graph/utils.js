import {Point} from "@projectstorm/geometry";
import {clipPathSelectedBorder, clipPathTopAdjustment} from "../../../constants";
import ModelSingleton from "../ModelSingleton";

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

export function updateCompositionDimensions(composition, children) {
    const metagraph = ModelSingleton.getInstance().getMetaGraph()
    const {width, height, position} = getWrapperDimensions(children);
    composition.position = new Point(position.x, position.y);
    composition.updateDimensions({width, height});

    let ancestor = metagraph.getParent(composition);
    let updatedWidth = width + 1;
    let updatedHeight = height + 1;

    while (ancestor) {
        ancestor.updateDimensions({width: updatedWidth, height: updatedHeight});
        ancestor = metagraph.getParent(ancestor)

        // Increment dimensions for the next ancestor level.
        updatedWidth += 1;
        updatedHeight += 1;
    }
}