import { CallbackTypes } from '@metacell/meta-diagram';

export function handlePostUpdates(event, context) {
  const node = event.entity;
  switch (event.function) {
    case CallbackTypes.POSITION_CHANGED: {
      context.metaGraph.updateGraph(
        node,
        context.mousePos.x,
        context.mousePos.y,
        event?.extraCondition === CallbackTypes.CHILD_POSITION_CHANGED
      );
      context.interpreter.updateModel(node);
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
