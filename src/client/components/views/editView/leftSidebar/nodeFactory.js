import pnlStore from "../../../../redux/store";
import { MetaLinkModel } from "@metacell/meta-diagram";
import { PNLMechanisms } from "../../../../../constants";
import QueryService from "../../../../services/queryService";
import { PNLClasses, PNLLoggables } from "../../../../../constants";
import MechanismNode from "../../../../model/nodes/mechanism/MechanismNode";
import CompositionNode from "../../../../model/nodes/composition/CompositionNode";

export class NodeFactory {
  static createNode(nodeType, name, extra, engine) {
    const options = new Map();

    if (nodeType in pnlStore.getState().general[PNLLoggables]) {
      extra[PNLLoggables] = JSON.parse(JSON.stringify(pnlStore.getState().general[PNLLoggables][nodeType]))
    }

    switch (nodeType) {
      case PNLClasses.COMPOSITION:
        return new CompositionNode(name, nodeType, undefined, QueryService.getPortsNewNode(name, nodeType), extra);
      case PNLClasses.AUTODIFF_COMPOSITION:
        return new CompositionNode(name, nodeType, undefined, QueryService.getPortsNewNode(name, nodeType), extra);
      case PNLClasses.EM_COMPOSITION:
        console.log("EM COMPOSITION")
        return new CompositionNode(name, nodeType, undefined, QueryService.getPortsNewNode(name, nodeType), extra);
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
        extra['isExpanded'] = false;
        return new MechanismNode(name, nodeType, undefined, QueryService.getPortsNewNode(name, nodeType), extra);
      }
      default:
        console.error("Node type not found");
    }
  }
}
