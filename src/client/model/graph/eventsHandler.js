import {isDetachedMode} from "../utils";
import {BASE_ZOOM} from "../../../constants";
import ModelSingleton from '../ModelSingleton';
import {updateCompositionDimensions} from "./utils";
import {CallbackTypes} from '@metacell/meta-diagram';

export function handlePostUpdates(event, context) {
    const node = event.entity;
    const modelInstance = ModelSingleton.getInstance();

    switch (event.function) {
        case CallbackTypes.LINK_UPDATED: {
            const link = event.link;
            if (link.getSourcePort() === undefined && link.getTargetPort() === undefined) {
                modelInstance.removeLink(link);
            }
            break;
        }
        case CallbackTypes.NODE_REMOVED: {
            modelInstance.removeNode(node);
            modelInstance.updateTreeModel();
            const modelTree = modelInstance.getTreeModel();
            context.props.setModelTree(modelTree);
            break;
        }
        case CallbackTypes.POSITION_CHANGED: {
            modelInstance.updateModel(node, context.mousePos.x, context.mousePos.y);
            const modelTree = modelInstance.getTreeModel();
            context.props.setModelTree(modelTree);
            break;
        }
        case CallbackTypes.SELECTION_CHANGED: {
            const newInstance = node.getID();
            context.props.selectInstance(newInstance);
            break;
        }

        case CallbackTypes.ZOOM_UPDATED:
        case CallbackTypes.OFFSET_UPDATED:{
            const isDetached = isDetachedMode(context);
            if (isDetached) {
                const composition = context.props.compositionOpened
                const engine = context.engine
                const zoomLevel = engine.getModel().getZoomLevel();
                const zoomRatio = zoomLevel / BASE_ZOOM
                const offsetX = engine.getModel().getOffsetX();
                const offsetY = engine.getModel().getOffsetY();
                let newPosition = undefined
                if (offsetX > 0 || offsetY > 0){
                    newPosition = composition.position
                    if (offsetX > 0){
                        newPosition.x = -offsetX * zoomRatio
                    }
                    if (offsetY > 0){
                        newPosition.y = -offsetY * zoomRatio
                    }
                }
                const newDimensions = {
                    width: (composition.width + Math.abs(offsetX)) * zoomLevel,
                    height: (composition.height + Math.abs(offsetY)) * zoomLevel,
                };

                updateCompositionDimensions(composition, newDimensions, newPosition);
            }
            break;
        }
        default: {
            console.log(
                'Function callback type not yet implemented ' + event.function
            );
            // return false;
        }
    }
    return true;
}


export function handlePreUpdates(event, context) {
    return true;
}


export const MetaGraphEventTypes = {
    NODE_ADDED: 'NODE_ADDED',
    LINK_ADDED: 'LINK_ADDED',
    NODE_REMOVED: 'NODE_REMOVED',
    LINK_REMOVED: 'LINK_REMOVED',
}
