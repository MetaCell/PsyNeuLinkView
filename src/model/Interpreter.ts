import { GVTypes, PNLClasses } from '../constants';
import { PortTypes } from '@metacell/meta-diagram';
import ProjectionLink from './links/ProjectionLink';
import QueryService from '../services/queryService';
import MechanismNode from './nodes/mechanism/MechanismNode';
import CompositionNode from './nodes/composition/CompositionNode';

const html2json = require('html2json').html2json
const typesArray = Object.values(GVTypes);
const parse = require('dotparser');


export default class ModelInterpreter {
    nativeModel: any;
    jsonModel: Object;

    constructor(model: any) {
        this.nativeModel = model;
        this.jsonModel = this._convertModel(model);
    }

    _convertModel(model: any) : Object {
        const parsedModel = {
            [PNLClasses.COMPOSITION]: [],
            [PNLClasses.MECHANISM]: [],
        };

        parsedModel[PNLClasses.COMPOSITION] = model[PNLClasses.COMPOSITION].map((singleModel: any) => {
            const newModel = parse(singleModel).map((elem: any) => ModelInterpreter.castObject(elem, undefined));
            return newModel;
        });

        parsedModel[PNLClasses.MECHANISM] = model[PNLClasses.MECHANISM].map((singleNode: any) => {
            let tempNode = parse(singleNode)[0].children.filter((elem: { node_id: { id: string; }; }) => elem.node_id.id !== 'graph');
            let newNode = tempNode.map((elem: any) => ModelInterpreter.castObject(elem, undefined));
            return newNode;
        });

        return parsedModel;
    }

    updateModel(newModel: any) {
        this.jsonModel = this._convertModel(newModel);
    }

    getModel() {
        return this.jsonModel;
    }

    getNativeModel() {
        return this.nativeModel;
    }

    static parseNodePorts(name: string, type: string): { [key: string]: any } {
        let ports: { [key: string]: any[] } = {
            [PortTypes.INPUT_PORT]: [],
            [PortTypes.OUTPUT_PORT]: [],
            [PortTypes.PARAMETER_PORT]: []
        };

        const result = QueryService.getPorts(name, type);

        if (result !== '') {
            const parsedPorts = result.replace('[', '').replace(']', '').split(', ');
            parsedPorts.forEach(element => {
                const elementData = element.slice(1, -1).split(' ');
                switch(elementData[0]) {
                    case 'InputPort':
                        ports[PortTypes.INPUT_PORT].push(elementData[1]);
                        break;
                    case 'OutputPort':
                        ports[PortTypes.OUTPUT_PORT].push(elementData[1]);
                        break;
                    case 'ParameterPort':
                        ports[PortTypes.PARAMETER_PORT].push(elementData[1]);
                        break;
                }
            });
        }
        return ports;
    }

    static castObject(item: MechanismNode|CompositionNode|ProjectionLink|any, parent: any|undefined) : MechanismNode|CompositionNode|ProjectionLink {
        let newNode = item;
        if (item?.type === undefined) {
            throw new TypeError('type is missing, object cannot be casted to the right class type.');
        }
        switch (item.type) {
            case GVTypes.COMPOSITION: {
                let extra: { [key: string]: any } = {};
                let ports : any = [];
                let children: { [key: string]: any } = {
                    [PNLClasses.MECHANISM]: [],
                    [PNLClasses.PROJECTION]: [],
                    [PNLClasses.COMPOSITION]: [],
                }
                newNode = new CompositionNode(item.id, parent, '', false, ports, extra, children);
                item.children.forEach((element: any) => {
                    if (element.type === 'attr_stmt') {
                        extra[element.target] = {}
                        element.attr_list.forEach( (innerElement: any) => {
                            if (innerElement.type === 'attr') {
                                extra[element.target][innerElement?.id] = innerElement?.eq;
                            }
                        });
                        return;
                    }
                    if (typesArray.includes(element.type)) {
                        switch (element.type) {
                            case GVTypes.COMPOSITION: {
                                children[PNLClasses.COMPOSITION].push(ModelInterpreter.castObject(element, newNode));
                                break;
                            }
                            case GVTypes.MECHANISM: {
                                children[PNLClasses.MECHANISM].push(ModelInterpreter.castObject(element, newNode));
                                break;
                            }
                            case GVTypes.PROJECTION: {
                                children[PNLClasses.PROJECTION].push(ModelInterpreter.castObject(element, newNode));
                                break;
                            }
                            default:
                                // TODO: enable this in the future
                                // throw new Error(`Casting error, "${item.type}" type not known.`);
                                console.log(`Casting error, "${item.type}" type not known.`);
                        }
                    }
                });
                break;
            }
            case GVTypes.MECHANISM: {
                let ports: { [key: string]: any } = this.parseNodePorts(item?.node_id?.id, PNLClasses.MECHANISM);
                let extra: { [key: string]: any } = {};
                item.attr_list.forEach((singleAttr: any) => {
                    if (singleAttr.id === 'label') {
                        // TODO: implement the parsing of the json structure generated below
                        // in order to detect ports and other elements of the node.
                        let parsedHtml = html2json(singleAttr.eq.value);
                        // console.log(parsedHtml)
                    }
                    if (singleAttr.type === 'attr') {
                        extra[singleAttr?.id] = singleAttr?.eq;
                    }
                });
                newNode = new MechanismNode(item?.node_id?.id, parent, '', false, ports, extra);
                break;
            }
            case GVTypes.PROJECTION: {
                let name = '';
                let extra: { [key: string]: any } = {};
                let sender, senderPort, receiver, receiverPort;
                item.attr_list.forEach((singleAttr: any) => {
                    if (singleAttr.id === 'label') {
                        name = singleAttr.eq;
                        return;
                    }
                    if (singleAttr.type === 'attr') {
                        extra[singleAttr?.id] = singleAttr?.eq;
                    }
                });
                if (item.edge_list.length === 2) {
                    sender = item.edge_list[0].id;
                    senderPort = item.edge_list[0]['port']['id'];
                    receiver = item.edge_list[1].id;
                    receiverPort = item.edge_list[1]['port']['id'];
                }
                newNode = new ProjectionLink(name, sender, senderPort, receiver, receiverPort, false, extra);
                break;
            }
            default:
                // TODO: enable this in the future
                // throw new Error(`Casting error, "${item.type}" type not known.`);
                console.log(`Casting error, "${item.type}" type not known.`);
        }
        return newNode;
    }
}