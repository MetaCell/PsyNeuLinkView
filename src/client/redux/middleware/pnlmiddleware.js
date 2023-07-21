import {
    CLOSE_COMPOSITION,
    LOAD_MODEL, OPEN_COMPOSITION,
    UPDATE_MODEL
} from "../actions/general";
import {modelUpdated} from "../actions/general";
import ModelSingleton from "../../model/ModelSingleton";
import {SNAPSHOT_DIMENSIONS} from "../../../constants";
// import {updateCompositionDimensions} from "../../model/graph/utils";
import {Point} from "@projectstorm/geometry";

const pnlMiddleware = store => next => action => {
    let performUpdate = true;
    switch (action.type) {
        case LOAD_MODEL: {
            // ModelSingleton.initInstance(action.data);
            break;
        }
        case UPDATE_MODEL: {
            performUpdate = false;
            next(action);
            next(modelUpdated());
            break;
        }
        case OPEN_COMPOSITION: {
            const composition = action.data
            const metaGraph = ModelSingleton.getInstance().getMetaGraph()
            // Snapshots dimensions before detached mode is enabled
            composition.setOption(SNAPSHOT_DIMENSIONS, {
                width: composition.width,
                height: composition.height,
                position: {x: composition.position.x, y: composition.position.y}
            })
            let ancestor = metaGraph.getParent(composition);
            while (ancestor) {
                ancestor.setOption(SNAPSHOT_DIMENSIONS, {
                    width: ancestor.width,
                    height: ancestor.height,
                    position: {x: ancestor.position.x, y: ancestor.position.y}
                });
                ancestor = metaGraph.getParent(ancestor);
            }

            break;
        }

        case CLOSE_COMPOSITION: {
            let composition = action.data
            const metaGraph = ModelSingleton.getInstance().getMetaGraph()

            // Restores original dimensions
            while (composition) {
                const {width, height, position} = composition.getOption(SNAPSHOT_DIMENSIONS)
                composition.position = new Point(position.x, position.y);
                composition.updateDimensions({width, height});
                composition.setOption('width', width);
                composition.setOption('height', height);
                // Clears stored dimensions
                composition.setOption(SNAPSHOT_DIMENSIONS, undefined)
                composition = metaGraph.getParent(composition)
            }

            // Clears the selection of all items in the model
            const diagramModel = action.data.parent.parent
            diagramModel.clearSelection();
            // Recalculates nodes local position
            const model = ModelSingleton.getInstance();
            model.getMetaGraph().getChildren(action.data).forEach(node => {
                node.updateLocalPosition(action.data)
            })
            break;
        }
        default: {
            break;
        }
    }

    if (performUpdate) {
        next(action);
    }
}

export default pnlMiddleware;
