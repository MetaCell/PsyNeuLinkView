import {NodeFactory} from "./nodeFactory";
import pnlStore from '../../../../redux/store';
import ModelSingleton from "../../../../model/ModelSingleton";
import { updateMechanismCount, addNodeToModel, setModelTree } from '../../../../redux/actions/general';

export function onNodeDrop(monitor, node, engine) {
  pnlStore.dispatch(updateMechanismCount());
  const currentCount = pnlStore.getState().general.mechanismCount;
  const name = `${node.type}${currentCount}`;
  const height = 450;
  const width = 450;
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


  if (pnlStore.getState().general.compositionOpened !== undefined) {
    // let parent = pnlStore.getState().general.compositionOpened;
    newNodeModel.setParent(pnlStore.getState().general.compositionOpened);
    let parentPath = pnlStore.getState().general.compositionOpened.getOption("graphPath")
    newNodeModel.setOption("graphPath", parentPath.concat(newNodeModel.getOption('name')));
  }

  metaGraph.addNode(newNodeModel);
  pnlStore.dispatch(addNodeToModel());
  const modelTree = modelHander.getTreeModel();
  pnlStore.dispatch(setModelTree(modelTree));
}
