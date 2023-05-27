import {PortTypes} from "@metacell/meta-diagram";
import MechanismNode from "../../../../model/nodes/mechanism/MechanismNode";

export class NodeFactory {
    static createNode(nodeType, name, extra) {
        // Add more cases for different node types as needed
        switch (nodeType) {
            default:
                let ports = {
                    [PortTypes.INPUT_PORT]: [],
                    [PortTypes.OUTPUT_PORT]: [],
                    [PortTypes.PARAMETER_PORT]: [],
                };
                return new MechanismNode(name, 'ProcessingMechanism', undefined, ports, extra);
        }
    }
}