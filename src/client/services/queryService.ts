// This is a mock service (for now)

import { PNLClasses } from "../../constants";
import { input, mid, out, composition, single_node } from "../resources/summaries";

declare global {
    interface Window {
        interfaces: any;
    }
}

export default class QueryService {
    // constructor() {}

    static getType(nodeName: string): Promise<string> {
        const grpcClient = window.interfaces.GRPCClient;
        const request = {
            'method': 'getType',
            'params': nodeName
        }
        // return grpcClient.apiCall(request, (response: any) => {
        //     const parsedResponse = JSON.parse(response.getGenericjson())
        //     console.log('Query Service get type response');
        //     console.log(parsedResponse);
        //     return parsedResponse.type;
        // });

        return new Promise((resolve, reject) => grpcClient.apiCall(request, (response: any) => {
            const parsedResponse = JSON.parse(response.getGenericjson())
            console.log('Query Service get type response');
            console.log(parsedResponse);
            resolve(parsedResponse.type);
        }));
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
        return '';
    }
}
