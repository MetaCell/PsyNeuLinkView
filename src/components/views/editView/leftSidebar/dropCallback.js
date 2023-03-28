import { MetaNodeModel, MetaPort, PortTypes } from '@metacell/meta-diagram';
import { PNLClasses } from '../../../../constants';
import { updateMechanismCount } from '../../../../redux/actions/general';
import pnlStore from '../../../../redux/store';

export function onNodeDrop(monitor, node, engine) {
  const options = new Map();
  const position = monitor?.getClientOffset();
  pnlStore.dispatch(updateMechanismCount());
  const currentCount = pnlStore.getState().general.mechanismCount;
  const name = `${node.name} ${currentCount}`;

  options.set('id', name);
  options.set('name', name);
  options.set('variant', 'node-blue');
  options.set('width', 266);
  options.set('height', 619);
  options.set('selected', false);
  options.set('pnlClass', PNLClasses.MECHANISM);
  options.set('shape', PNLClasses.MECHANISM);
  options.set('graphPath', ['Composition-0', 'input']);
  options.set('ports', [
    new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined),
    new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined),
  ]);
  options.set('position', position);
  options.set('localPosition', position);

  const newNode = new MetaNodeModel(Object.fromEntries(options));

  if (engine) {
    return engine.getModel().addNode(newNode);
  }
}
