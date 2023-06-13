// This is a mock service (for now)

import { PNLClasses } from "../../constants";
import { input, mid, out, composition, single_node } from "../resources/summaries";

export default class QueryService {
    // constructor() {}

    static getType(nodeName: string): string {
        let _json = undefined;
        switch (nodeName) {
            case 'input':
                _json = JSON.parse(input);
                break;
            case 'mid':
                _json = JSON.parse(mid);
                break;
            case 'output':
                _json = JSON.parse(out);
                break;
            case 'single_node':
                _json = JSON.parse(single_node);
                break;
            case 'comp':
                _json = JSON.parse(composition);
                break;
            case 'Composition-1':
                _json = JSON.parse(composition);
                nodeName = 'comp';
                break;
            default:
                if (nodeName.toLowerCase().includes('comp')) {
                    return 'Composition'
                } else {
                    return 'ProcessingMechanism'
                }
        }
        return _json[nodeName].metadata.type
    }

    static getPorts(nodeName: string): string {
        switch(nodeName) {
            case 'comp':
                return '[(InputPort INPUT_CIM_input_InputPort-0), (OutputPort OUTPUT_CIM_output_OutputPort-0)]';
            case 'input':
                return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
            case 'mid':
                return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
            case 'mid2':
                return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
            case 'output':
                return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
            case 'single_node':
                return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
            default:
                return '[(InputPort InputPort-0), (ParameterPort intercept), (ParameterPort slope), (OutputPort OutputPort-0)]'
        }
    }
}
