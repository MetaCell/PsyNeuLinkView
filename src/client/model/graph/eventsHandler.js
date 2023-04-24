import { CallbackTypes } from '@metacell/meta-diagram';
import ModelSingleton from '../ModelSingleton';

export function handlePostUpdates(event, context) {
  const node = event.entity;
  const modelInstance = ModelSingleton.getInstance();
  switch (event.function) {
    case CallbackTypes.POSITION_CHANGED: {
      modelInstance.updateModel(node, context.mousePos.x, context.mousePos.y);
      break;
    }
    case CallbackTypes.SELECTION_CHANGED: {
      event.firing = false;
      event.isSelected = false;
      event.stopPropagation();
      // const newInstance = node.getID();
      // context.props.selectInstance(newInstance);
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
  event.firing = false;
  event.isSelected = false;
  event.stopPropagation();
  return true;
}