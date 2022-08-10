import { PNLClasses } from '../constants';
// const html2json = require('html2json').html2json;


export function buildModel(frontendModel, coord, prevModel) {
    let finalModel = {
        [PNLClasses.MECHANISM]: [],
        [PNLClasses.PROJECTION]: [],
        [PNLClasses.COMPOSITION]: [],
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

    frontendModel[PNLClasses.MECHANISM]?.forEach( node => {
        if (Array.isArray(node)) {
            node.forEach( mech => {
                finalModel[PNLClasses.MECHANISM]?.push(mech.getMetaNode());
            });
        } else {
            finalModel[PNLClasses.MECHANISM]?.push(node.getMetaNode());
        }
    });

    frontendModel[PNLClasses.PROJECTION]?.forEach( node => {
        if (Array.isArray(node)) {
            node.forEach( proj => {
                finalModel[PNLClasses.PROJECTION]?.push(proj.getMetaLink());
            });
        } else {
            finalModel[PNLClasses.PROJECTION]?.push(node.getMetaLink());
        }
    });

    frontendModel[PNLClasses.COMPOSITION]?.forEach( node => {
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