import MechanismNode from './nodes/mechanism/MechanismNode';
import CompositionNode from './nodes/composition/CompositionNode';
import ProjectionLink from './links/ProjectionLink';
import { PNLTypes } from '../constants';
import MetaDiagram, {MetaNode, Position, MetaLink} from "meta-diagram";

const html2json = require('html2json').html2json
const typesArray = Object.values(PNLTypes);

export function castObject(item) {
    let newNode = item;
    if (item?.type === undefined) {
        throw new TypeError('type is missing, object cannot be casted to the right class type.');
    }
    switch (item.type) {
        case PNLTypes.COMPOSITION: {
            let extra = {};
            let ports = [];
            let children = {
                'mechanisms': [],
                'projections': [],
                'compositions': [],
            }
            item.children.forEach(element => {
                if (element.type === 'attr_stmt') {
                    extra[element.target] = {}
                    element.attr_list.forEach( innerElement => {
                        if (innerElement.type === 'attr') {
                            extra[element.target][innerElement?.id] = innerElement?.eq;
                        }
                    });
                    return;
                }
                if (typesArray.includes(element.type)) {
                    switch (element.type) {
                        case PNLTypes.COMPOSITION: {
                            children['compositions'].push(castObject(element));
                            break;
                        }
                        case PNLTypes.MECHANISM: {
                            children['mechanisms'].push(castObject(element));
                            break;
                        }
                        case PNLTypes.PROJECTION: {
                            children['projections'].push(castObject(element));
                            break;
                        }
                        default:
                            // TODO: enable this in the future
                            // throw new Error(`Casting error, "${item.type}" type not known.`);
                            console.log(`Casting error, "${item.type}" type not known.`);
                    }
                }
            });
            newNode = new CompositionNode(item.id, '', false, ports, extra, children);
            break;
        }
        case PNLTypes.MECHANISM: {
            let ports = [];
            let extra = {};
            item.attr_list.forEach(singleAttr => {
                if (singleAttr.id === 'label') {
                    // TODO: implement the parsing of the json structure generated below
                    // in order to detect ports and other elements of the node.
                    //
                    // parsedHtml = html2json(singleAttr.eq);
                    return;
                }
                if (singleAttr.type === 'attr') {
                    extra[singleAttr?.id] = singleAttr?.eq;
                }
            });
            newNode = new MechanismNode(item?.node_id?.id, '', false, ports, extra);
            break;
        }
        case PNLTypes.PROJECTION: {
            let name = '';
            let extra = {};
            let sender, senderPort, receiver, receiverPort;
            item.attr_list.forEach(singleAttr => {
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


export function buildModel(frontendModel, coord, prevModel) {
    let finalModel = {
        mechanisms: [],
        projections: [],
        compositions: [],
    };

    if (prevModel) {
        finalModel= prevModel;
    }

    let coordinates = {
        x: 200,
        y: 150,
    };

    let linkCounter = 1;

    if (coord) {
        coordinates.x = coord.x;
        coordinates.y = coord.y;
    }

    frontendModel?.mechanisms?.forEach( node => {
        if (Array.isArray(node)) {
            node.forEach( mech => {
                finalModel.mechanisms.push(
                    new MetaNode(mech.name, mech.name, 'mechanism', new Position(coordinates.x, coordinates.y),
                        new Map(Object.entries({
                            name: 'Mechanism Name',
                            variant: 'node-blue',
                            pnlClass: 'ProcessingMechanism',
                            shape: 'circle',
                            selected: false
                }))));
                coordinates.x += 250;
            });
        } else {
            finalModel.mechanisms.push(
                new MetaNode(node.name, node.name, 'mechanism', new Position(coordinates.x, coordinates.y),
                    new Map(Object.entries({
                        name: 'Mechanism Name',
                        variant: 'node-red',
                        pnlClass: 'ProcessingMechanism',
                        shape: 'circle',
                        selected: false
            }))));
            coordinates.x += 250;
        }
    });

    frontendModel?.projections?.forEach( node => {
        if (Array.isArray(node)) {
            node.forEach( proj => {
                let name = proj.name !== '' ? proj.name : 'link' + linkCounter++;
                const link = new MetaLink(name, name, 'projection', proj?.sender, 'out', proj?.receiver, 'in',
                    new Map(Object.entries({color: 'rgb(255,192,0)'}))
                );
                finalModel.projections.push(link);
            });
        } else {
            let name = node.name !== '' ? node.name : 'link' + linkCounter++;
            const link = new MetaLink(name, name, 'projection', node?.sender, 'out', node?.receiver, 'in',
                new Map(Object.entries({color: 'rgb(255,192,0)'}))
            );
            finalModel.projections.push(link);
        }
    });

    frontendModel?.compositions?.forEach( node => {
        if (Array.isArray(node)) {
            node.forEach( comp => {
                // TODO: create the composition and add it to the model
                coordinates.y += 250;
                buildModel(comp.children, coordinates, finalModel);
            });
        } else {
            // TODO: create the composition and add it to the model
            coordinates.y += 250;
            buildModel(node.children, coordinates, finalModel);
        }
    });

    return finalModel;
}