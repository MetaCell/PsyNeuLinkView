import { PNLClasses } from "../../../../../constants";
import { MetaLinkModel } from "@metacell/meta-diagram";
import { PNLMechanisms } from "../../../../../constants";
import QueryService from "../../../../services/queryService";
import { MetaNodeToOptions } from "../../../../model/nodes/utils";
import MechanismNode from "../../../../model/nodes/mechanism/MechanismNode";

export class NodeFactory {
  static createNode(nodeType, name, extra, engine) {
    const options = new Map();

    console.log("MetaNodeToOptions", MetaNodeToOptions[nodeType]);
    // Add more cases for different node types as needed
    switch (nodeType) {
      //TODO: work on nodes and link creation improvements
      case PNLClasses.COMPOSITION:
        // TODO: remove new ports from composition since this does not have any ports
        return new MechanismNode(name, nodeType, undefined, QueryService.getPortsNewNode(), extra);
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
      case PNLMechanisms.MECHANISM:
      case PNLMechanisms.LEARNING_MECH:
      case PNLMechanisms.MODULATORY_MECH:
      case PNLMechanisms.PROCESSING_MECH:
      case PNLMechanisms.CONTRASTIVE_MECH:
      case PNLMechanisms.AUTO_LEARNING_MECH:
      case PNLMechanisms.PREDICTION_ERROR_MECH:
      case PNLMechanisms.DEFAULT_PROCESSING_MECH:
      case PNLMechanisms.GATING_MECH:
      case PNLMechanisms.CTRL_MECH:
      case PNLMechanisms.LC_CTRL_MECH:
      case PNLMechanisms.AGT_CTRL_MECH:
      case PNLMechanisms.OPT_CTRL_MECH:
      case PNLMechanisms.COMPOSITION_MECH:
      case PNLMechanisms.INTEGRATOR_MECH:
      case PNLMechanisms.OBJ_MECH:
      case PNLMechanisms.TRANSFER_MECH:
      case PNLMechanisms.RECURRENT_TRANSFER_MECH:
      case PNLMechanisms.DDM:
      case PNLMechanisms.EPISODIC_MECH:
      case PNLMechanisms.COMPARATOR_MECH:
      case PNLMechanisms.KOHONEN_MECH:
      case PNLMechanisms.KOHONEN_LEARNING_MECH:
      case PNLMechanisms.KWTA_MECH:
      case PNLMechanisms.LCA_MECH: {
        options.set('id', name);
        options.set('name', name);
        options.set('variant', 'node-blue');
        options.set('width', extra.width);
        options.set('height', extra.height);
        options.set('selected', false);
        options.set('pnlClass', nodeType);
        options.set('shape', nodeType);
        options.set('graphPath', [null]);
        options.set('depth', 0);
        options.set('ports', QueryService.getPortsNewNode());

        // Set the options for the mechanism subclass
        const dict = MetaNodeToOptions[nodeType];
        Object.keys(dict).forEach((key) => {
          options.set(key, dict[key]);
        });

        return new MechanismNode(name, nodeType, undefined, QueryService.getPortsNewNode(), extra);
      }
      default:
        console.error("Node type not found");
    }
  }
}
