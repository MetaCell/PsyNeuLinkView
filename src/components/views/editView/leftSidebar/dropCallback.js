import { updateMechanismCount } from '../../../../redux/actions/general';
import pnlStore from '../../../../redux/store';
import { NodeFactory } from '../../../../client/components/views/editView/leftSidebar/nodeFactory';
import ModelSingleton from '../../../../client/model/ModelSingleton';

export function onNodeDrop(monitor, node, engine) {
  pnlStore.dispatch(updateMechanismCount());
  const currentCount = pnlStore.getState().general.mechanismCount;
  const name = `${node.type}${currentCount}`;
  const height = 619;
  const width = 266;
  const nodeType = node.type.toUpperCase();

  // Get the client offset (mouse coordinates)
  const clientOffset = monitor?.getClientOffset();

  // Convert the client coordinates to the engine's relative coordinates
  const position = engine.getRelativeMousePoint({
    clientX: clientOffset.x - width / 4,
    clientY: clientOffset.y - height / 4,
  });

  // Set the position as an extra property
  let extra = {
    position: {
      x: position.x,
      y: position.y,
    },
  };

  const newNode = NodeFactory.createNode(nodeType, name, extra);
  const newNodeModel = newNode.getMetaNode().toModel();
  ModelSingleton.getInstance().getMetaGraph().addNode(newNodeModel);
}
