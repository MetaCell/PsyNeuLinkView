import { CallbackTypes } from '@metacell/meta-diagram';
import ModelSingleton from '../../model/ModelSingleton';

export function handlePostUpdates(event, context) {
  const node = event.entity;
  const modelInstance = ModelSingleton.getInstance();
  switch (event.function) {
    case CallbackTypes.POSITION_CHANGED: {
      modelInstance.getMetaGraph().updateGraph(
        node,
        context.mousePos.x,
        context.mousePos.y,
        event?.extraCondition === CallbackTypes.CHILD_POSITION_CHANGED
      );
      modelInstance.getInterpreter().updateModel(node);
      break;
    }
    case CallbackTypes.SELECTION_CHANGED: {
      const newInstance = node.getID();
      context.props.selectInstance(newInstance);
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
