import {
  MetaNode,
  MetaNodeModel,
  MetaPort,
  PortTypes,
} from '@metacell/meta-diagram';
import { PNLClasses } from '../../../../constants';
import { updateMechanismCount } from '../../../../redux/actions/general';
import pnlStore from '../../../../redux/store';
import MechanismNode from '../../../../model/nodes/mechanism/MechanismNode';
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

  options.set('id', name);
  options.set('name', name);
  options.set('variant', 'node-blue');
  options.set('width', width);
  options.set('height', height);
  options.set('selected', false);
  options.set('pnlClass', PNLClasses.MECHANISM);
  options.set('shape', PNLClasses.MECHANISM);
  options.set('graphPath', [null]);
  options.set('depth', 0);
  options.set('ports', [
    new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined),
    new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined),
  ]);
  options.set('position', new Point(position.x, position.y));
  options.set('localPosition', new Point(position.x, position.y));

  const newNode = new MetaNodeModel(Object.fromEntries(options));

  if (engine) {
    return engine.getModel().addNode(newNode);
  }
}
