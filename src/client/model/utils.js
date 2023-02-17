import { PNLClasses } from '../../constants';
import { MetaGraph } from './graph/MetaGraph';

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
