import pnlStore from "../redux/store";
import { PNLDefaults } from "../../constants";
import { PortTypes } from "@metacell/meta-diagram";
import ModelSingleton from "../model/ModelSingleton";
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
        };
        return new Promise((resolve, reject) => grpcClient.apiCall(request, (response: any) => {
            const parsedResponse = JSON.parse(response.getGenericjson())
            console.log('Query Service get type response');
            console.log(parsedResponse);
            resolve(parsedResponse.type);
        }));
    }

    static getPorts(nodeName: string): string {
        const summary: any = ModelSingleton.getSummaries();
        if (summary.hasOwnProperty(nodeName)) {
            const nodeInfo: any = summary[nodeName][nodeName];
            let ports: string = '[';
            for (const inputPort in nodeInfo?.input_ports) {
                ports += `(InputPort ${inputPort}), `;
            }
            for (const outputPort in nodeInfo?.output_ports) {
                ports += `(OutputPort ${outputPort}), `;
            }
            return ports?.slice(0, -2) + ']';
        }
        return '[]';
    }

    static getPortsNewNode(nodeName: string, nodeType: string): { [key: string]: any } {
        const defaults: any = pnlStore.getState().general[PNLDefaults]
        const secondaryNodeType = Object.keys(defaults).find(key => key.includes(nodeType)) as string
        const classInfo: any = defaults[nodeType] !== undefined ? defaults[nodeType] : defaults[secondaryNodeType];
        const ports: { [key: string]: any[] } = {
            [PortTypes.INPUT_PORT]: [],
            [PortTypes.OUTPUT_PORT]: [],
            [PortTypes.PARAMETER_PORT]: []
        };
        for (const inputPort in classInfo?.input_ports) {
            ports[PortTypes.INPUT_PORT].push(inputPort.replace(nodeType + '_0_', ''));
        }
        for (const outputPort in classInfo?.output_ports) {
            ports[PortTypes.OUTPUT_PORT].push(outputPort.replace(nodeType + '_0_', ''));
        }
        return ports;
    }
}
