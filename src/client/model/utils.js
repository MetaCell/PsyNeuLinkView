import { MetaGraph } from './graph/MetaGraph';
import { PNLClasses, PNLMechanisms } from '../../constants';

export function buildModel(frontendModel, coord, prevModel) {
    let finalModel = {};

    Object.keys(PNLClasses).forEach((key) => {
        finalModel[key] = [];
    });

    Object.keys(PNLMechanisms).forEach((key) => {
        finalModel[key] = [];
    });

    if (prevModel) {
        finalModel= prevModel;
    }

    let coordinates = {
        x: 200,
        y: 150,
    };

    if (coord) {
        coordinates.x = coord.x;
        coordinates.y = coord.y;
    }

    Object.keys(PNLMechanisms).forEach((key) => {
        frontendModel[key]?.forEach( node => {
            if (Array.isArray(node)) {
                node.forEach( mech => {
                    finalModel[key]?.push(mech.getMetaNode());
                });
            } else {
                finalModel[key]?.push(node.getMetaNode());
            }
        });
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
                finalModel[PNLClasses.COMPOSITION]?.push(comp.getMetaNode());
                buildModel(comp.children, coordinates, finalModel);
            });
        } else {
            finalModel[PNLClasses.COMPOSITION]?.push(node.getMetaNode());
            buildModel(node.children, coordinates, finalModel);
        }
    });

    return finalModel;
}

export function generateMetaGraph(metaNodes) {
    const metaGraph = new MetaGraph()
    metaNodes.sort(function(a, b) {
        return a.getDepth() - b.getDepth();
    });

    for(const mn of metaNodes){
        const metaNodeModel = mn.toModel()
        metaGraph.addNode(metaNodeModel)
    }
    return metaGraph
}


export function findTopLeftCorner(ldraw, pos) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    ldraw.forEach(element => {
        if (element.op.toUpperCase() === 'P') {
            element.points.forEach(point => {
                minX = Math.min(minX, point[0]);
                minY = Math.min(minY, point[1]);
                maxX = Math.max(maxX, point[0]);
                maxY = Math.max(maxY, point[1]);
            });
        }
    });

    const coordinates = pos.split(',');
    const centerX = parseFloat(coordinates[0]);
    const centerY = parseFloat(coordinates[1]);
    const width = maxX - minX;
    const height = maxY - minY;

    const topLeftCornerX = centerX - width / 2;
    const topLeftCornerY = centerY - height / 2;

    return [topLeftCornerX, topLeftCornerY];
}