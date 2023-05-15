import { updateMechanismCount } from '../../../../redux/actions/general';
import pnlStore from '../../../../redux/store';
import {NodeFactory} from "./nodeFactory";
import ModelSingleton from "../../../../model/ModelSingleton";

export function onNodeDrop(monitor, node, engine) {

  pnlStore.dispatch(updateMechanismCount());
  const currentCount = pnlStore.getState().general.mechanismCount;
  const name = `${node.type}${currentCount}`;

  // Get the client offset (mouse coordinates)
  const clientOffset = monitor.getClientOffset();

  // Convert the client coordinates to the engine's relative coordinates
  const position = engine.getRelativeMousePoint({
    clientX: clientOffset.x,
    clientY: clientOffset.y,
  });

  // Set the position as an extra property
  let extra = {
    position: {
      x: position.x,
      y: position.y
    }
  };

  const newNode = NodeFactory.createNode(node.type, name, extra);
  const newNodeModel = newNode.getMetaNode().toModel()
  ModelSingleton.getInstance().getMetaGraph().addNode(newNodeModel)
}
