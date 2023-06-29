import {CallbackTypes} from '@metacell/meta-diagram';
import ModelSingleton from '../ModelSingleton';
import {isDetachedMode} from "../utils";
import {updateCompositionDimensions} from "./utils";


export function handlePostUpdates(event, context) {
    const node = event.entity;
    const modelInstance = ModelSingleton.getInstance();
    const defaultZoomLevel = 100;
    switch (event.function) {
        case CallbackTypes.POSITION_CHANGED: {
            modelInstance.updateModel(node, context.mousePos.x, context.mousePos.y);
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
                const offsetX = engine.getModel().getOffsetX();
                const offsetY = engine.getModel().getOffsetY();
                let newPosition = undefined
               if (offsetX > 0 || offsetY > 0){
                   newPosition = composition.position
                   if (offsetX > 0){
                       newPosition.x = -offsetX * defaultZoomLevel/zoomLevel
                   }
                   if (offsetY > 0){
                       newPosition.y = -offsetY * defaultZoomLevel/zoomLevel
                   }
               }
                const newDimensions = {
                    width: (composition.width + Math.abs(offsetX)) * zoomLevel,
                    height: (composition.height + Math.abs(offsetY)) * zoomLevel,
                };

                updateCompositionDimensions(composition, newDimensions, newPosition);
                console.log(zoomLevel)
                console.log(composition.position)
            }
            break
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
}