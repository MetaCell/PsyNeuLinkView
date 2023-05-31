import {CallbackTypes} from '@metacell/meta-diagram';
import ModelSingleton from '../ModelSingleton';
import {isDetachedMode} from "../utils";
import {updateCompositionDimensions} from "./utils";


export function handlePostUpdates(event, context) {
    const node = event.entity;
    const modelInstance = ModelSingleton.getInstance();
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

        case CallbackTypes.OFFSET_UPDATED:{
            // todo: also needs to happen for zoom
            const isDetached = isDetachedMode(context);
            if (isDetached) {
                const composition = context.props.compositionOpened
                const { offsetX, offsetY } = event;
                console.log(offsetX)
                let newPosition = undefined
               if (offsetX > 0 || offsetY < 0){
                   newPosition = composition.position
                   // offset is an accumulative value, we can use it directly as the coordinate value because in
                   // detached mode, the initial position is (0,0)
                   // and it doesn't change for positive offset values (the dimensions do)
                   if (offsetX > 0){
                       newPosition.x = -offsetX
                   }
                   if (offsetY < 0){
                       newPosition.y = offsetY
                   }
               }
                const newDimensions = {
                    width: composition.width + Math.abs(offsetX),
                    height: composition.height + Math.abs(offsetY),
                };

                updateCompositionDimensions(composition, newDimensions, newPosition);
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