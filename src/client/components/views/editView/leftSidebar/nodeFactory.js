import MechanismNode from "../../../../model/nodes/mechanism/MechanismNode";
import {PortTypes} from "@metacell/meta-diagram";

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
                return new MechanismNode(name, undefined, ports, extra);
        }
    }
}