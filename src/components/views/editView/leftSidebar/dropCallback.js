import {
  MetaLinkModel,
  MetaNodeModel,
  MetaPort,
  PortTypes,
} from '@metacell/meta-diagram';
import { PNLClasses } from '../../../../constants';
import { updateMechanismCount } from '../../../../redux/actions/general';
import pnlStore from '../../../../redux/store';
import { Point } from '@projectstorm/geometry';

export function onNodeDrop(monitor, node, engine) {
  const options = new Map();
  const offset = monitor?.getClientOffset();
  const height = 619;
  const width = 266;
  const position = { x: offset.x - width / 4, y: offset.y - height / 4 };
  pnlStore.dispatch(updateMechanismCount());
  const currentCount = pnlStore.getState().general.mechanismCount;
  const name = `${node.name} ${currentCount}`;
  const nodeType = node.type.toUpperCase();

  if (engine) {
    const model = engine.getModel();
    const selectedNodes = engine.getModel().getSelectedEntities();

    if (node.type === PNLClasses.PROJECTION) {
      if (selectedNodes.length !== 2) return;

      options.set('id', name);
      options.set('name', name);
      options.set('variant', PNLClasses[nodeType]);
      options.set('shape', PNLClasses[nodeType]);
      options.set('color', PNLClasses[nodeType]);
      const sourcePort = selectedNodes[0].getPort(
        selectedNodes[0].getOptions().ports[1].getName()
      );
      const targetPort = selectedNodes[1].getPort(
        selectedNodes[1].getOptions().ports[0].getName()
      );

      const link = new MetaLinkModel(Object.fromEntries(options));
      link.setSourcePort(sourcePort);
      link.setTargetPort(targetPort);

      model.addLink(link);
      engine.repaintCanvas();
    } else {
      options.set('id', name);
      options.set('name', name);
      options.set('variant', 'node-blue');
      options.set('width', width);
      options.set('height', height);
      options.set('selected', false);
      options.set('pnlClass', PNLClasses[nodeType]);
      options.set('shape', PNLClasses[nodeType]);
      options.set('graphPath', [null]);
      options.set('depth', 0);
      options.set('ports', [
        new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined),
        new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined),
      ]);
      options.set('position', new Point(position.x, position.y));
      options.set('localPosition', new Point(position.x, position.y));

      const newNode = new MetaNodeModel(Object.fromEntries(options));
      return model.addNode(newNode);
    }

    // const state = engine.getStateMachine().getCurrentState();
    // state.dragCanvas.config.allowDrag = !state.dragCanvas.config.allowDrag;
  }
}
