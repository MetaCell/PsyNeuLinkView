import { PNLTypes } from '../constants';
import ProjectionLink from './links/ProjectionLink';
import MechanismNode from './nodes/mechanism/MechanismNode';
import CompositionNode from './nodes/composition/CompositionNode';

const html2json = require('html2json').html2json
const typesArray = Object.values(PNLTypes);


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
                finalModel.mechanisms.push(mech.getMetaNode());
            });
        } else {
            finalModel.mechanisms.push(node.getMetaNode());
        }
    });

    frontendModel?.projections?.forEach( node => {
        if (Array.isArray(node)) {
            node.forEach( proj => {
                finalModel.projections.push(proj.getMetaLink());
            });
        } else {
            finalModel.projections.push(node.getMetaLink());
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