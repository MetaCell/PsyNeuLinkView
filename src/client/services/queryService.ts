// This is a mock service (for now)
import { PortTypes } from "@metacell/meta-diagram";
import { rpcAPIMessageTypes } from "../../nodeConstants";

declare global {
    interface Window {
        interfaces: any;
    }
}


export default class QueryService {
    static getType(nodeName: string): Promise<string> {
        const grpcClient = window.interfaces.GRPCClient;
        const request = {
            'method': rpcAPIMessageTypes.GET_TYPE,
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
    }

    static getPortsNewNode(): { [key: string]: any } {
        const ports: { [key: string]: any[] } = {
            [PortTypes.INPUT_PORT]: ["InputPort-0"],
            [PortTypes.OUTPUT_PORT]: ["OutputPort-0"],
            [PortTypes.PARAMETER_PORT]: ["intercept", "slope"]
        };
        return ports;
    }
}
