import { updateMechanismCount } from '../../../../redux/actions/general';
import pnlStore from '../../../../redux/store';
import {NodeFactory} from "./nodeFactory";
import ModelSingleton from "../../../../model/ModelSingleton";

export function onNodeDrop(monitor, node, engine) {
  pnlStore.dispatch(updateMechanismCount());
  const currentCount = pnlStore.getState().general.mechanismCount;
  const name = `${node.type}${currentCount}`;
  const height = 150;
  const width = 150;
  const nodeType = node.type;

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
    width: width,
    height: height,
  };

  const newNode = NodeFactory.createNode(nodeType, name, extra, engine);
  const newNodeModel = newNode.getMetaNode().toModel();
  const modelHander = ModelSingleton.getInstance();
  const metaGraph = modelHander.getMetaGraph();
  metaGraph.addNode(newNodeModel);
  // ModelSingleton.getInstance().getMetaGraph().addNode(newNodeModel);
}
