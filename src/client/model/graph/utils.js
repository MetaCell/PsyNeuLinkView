import {Point} from "@projectstorm/geometry";
import {PNLClasses, PNLMechanisms} from "../../../constants";
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

    const wrapperWidth = maxX - minX;
    const wrapperHeight = maxY - minY;
    const wrapperPosition = {x: minX, y: minY};

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

/**
 * Finds the new path for the given node based on the current parent and cursor coordinates.
 * @param {MetaNodeModel} metaNodeModel - The MetaNodeModel to find the new path for.
 * @param {MetaNodeModel | undefined} parent - The current parent node, or undefined if no parent.
 * @returns {string[]} - The new path for the node as an array of strings.
 */
export function getNewPath(metaNodeModel, parent) {
    if(parent && parent.getID() === metaNodeModel.getID()){
        return [metaNodeModel.getID()];
    }
    return [...parent?.getGraphPath() || [], metaNodeModel.getID()];
}

export function arePathsDifferent(metaNodeModel, newPath) {
    return metaNodeModel.getGraphPath().join().toString() !== newPath.join().toString();
}

export function isMechanism(node){
    return Object.values(PNLMechanisms).includes(node.getOptions().pnlClass)
}

export function isComposition(node){
    return node.getOptions().pnlClass === PNLClasses.COMPOSITION

}