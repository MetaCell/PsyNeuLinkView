// This is a mock service (for now)

import { PNLClasses } from "../constants";

export default class QueryService {
    // constructor() {}

    static getPorts(nodeName: string, nodeType: string): string {
        switch(nodeType) {
            case PNLClasses.COMPOSITION:
                return '[(InputPort INPUT_CIM_input_InputPort-0), (OutputPort OUTPUT_CIM_output_OutputPort-0)]'

            case PNLClasses.MECHANISM:
                switch (nodeName) {
                    case 'input':
                        return '[(InputPort InputPort-0), (InputPort Dario_port), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
                    case 'mid':
                        return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
                    case 'output':
                        return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
                    case 'single_node':
                        return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
                }
                break;

            case PNLClasses.PROJECTION:
                return '';
            default:
                return '';
        }
        return '';
    }

}

