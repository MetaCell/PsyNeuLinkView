import { PNLClasses } from "../../../../../constants";
import MechanismNode from "../../../../model/nodes/mechanism/MechanismNode";
import { MetaLinkModel, PortTypes } from "@metacell/meta-diagram";
// import { Point } from '@projectstorm/geometry';

export class NodeFactory {
  static createNode(nodeType, name, extra, engine) {
    const options = new Map();

    // Add more cases for different node types as needed
    switch (nodeType) {
      //TODO: work on nodes and link creation improvements
      case PNLClasses.PROJECTION:
        const selectedNodes = engine.getModel().getSelectedEntities();

        if (engine) {
          options.set("id", name);
          options.set("name", name);
          options.set("variant", PNLClasses[nodeType]);
          options.set("shape", PNLClasses[nodeType]);
          options.set("color", PNLClasses[nodeType]);
          const sourcePort = selectedNodes[0].getPort(
            selectedNodes[0].getOptions().ports[1].getName()
          );
          const targetPort = selectedNodes[1].getPort(
            selectedNodes[1].getOptions().ports[0].getName()
          );

          const link = new MetaLinkModel(Object.fromEntries(options));
          link.setSourcePort(sourcePort);
          link.setTargetPort(targetPort);

          return link;
        }
        break;
      default:
        //TODO: reuse below code to implement for each mechanism

        // options.set('id', name);
        // options.set('name', name);
        // options.set('variant', 'node-blue');
        // options.set('width', extra.width);
        // options.set('height', extra.height);
        // options.set('selected', false);
        // options.set('pnlClass', PNLClasses[nodeType]);
        // options.set('shape', PNLClasses[nodeType]);
        // options.set('graphPath', [null]);
        // options.set('depth', 0);
        // options.set('ports', [
        //   new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined),
        //   new MetaPort(
        //     'out',
        //     'out',
        //     PortTypes.OUTPUT_PORT,
        //     undefined,
        //     undefined
        //   ),
        // ]);
        // options.set('position', new Point(extra.position.x, extra.position.y));
        // options.set(
        //   'localPosition',
        //   new Point(extra.position.x, extra.position.y)
        // );

        // const newNode = new MetaNodeModel(Object.fromEntries(options));
        // return newNode;

        let ports = {
          [PortTypes.INPUT_PORT]: [],
          [PortTypes.OUTPUT_PORT]: [],
          [PortTypes.PARAMETER_PORT]: [],
        };
        return new MechanismNode(name, undefined, ports, extra);
    }
  }
}
