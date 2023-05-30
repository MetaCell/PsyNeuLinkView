import {
    CLOSE_COMPOSITION,
    LOAD_MODEL, OPEN_COMPOSITION,
    UPDATE_MODEL
} from "../actions/general";
import {modelUpdated} from "../actions/general";
import ModelSingleton from "../../model/ModelSingleton";
import {snapshotDimensionsLabel} from "../../../constants";
import {updateCompositionDimensions} from "../../model/graph/utils";
import {Point} from "@projectstorm/geometry";

const pnlMiddleware = store => next => action => {
    let performUpdate = true;
    switch (action.type) {
        case LOAD_MODEL: {
            ModelSingleton.initInstance(action.data);
            break;
        }
        case UPDATE_MODEL: {
            performUpdate = false;
            next(action);
            next(modelUpdated());
            break;
        }
        case OPEN_COMPOSITION: {
            const metagraph = ModelSingleton.getInstance().getMetaGraph()
            const composition = action.data
            // Snapshots dimensions before detached mode is enabled
            composition.setOption(snapshotDimensionsLabel, {
                width: composition.width,
                height: composition.height,
                position: {x: composition.position.x, y: composition.position.y}
            })
            let ancestor = metagraph.getParent(composition);
            while (ancestor) {
                ancestor.setOption(snapshotDimensionsLabel, {
                    width: ancestor.width,
                    height: ancestor.height,
                    position: {x: ancestor.position.x, y: ancestor.position.y}
                });
                ancestor = metagraph.getParent(ancestor);
            }
            updateCompositionDimensions(composition, metagraph.getChildren(composition));
            break;
        }
        case CLOSE_COMPOSITION: {
            const metagraph = ModelSingleton.getInstance().getMetaGraph()
            let composition = action.data
            // Restores original dimensions
            while (composition) {
                const {width, height, position} = composition.getOption(snapshotDimensionsLabel)
                composition.position = new Point(position.x, position.y);
                composition.updateDimensions({width, height});
                composition.setOption('width', width);
                composition.setOption('height', height);
                // Clears stored dimensions
                composition.setOption(snapshotDimensionsLabel, undefined)
                composition = metagraph.getParent(composition);
            }
            // Clears the selection of all items in the model
            const diagramModel = action.data.parent.parent
            diagramModel.clearSelection();
            // Recalculates nodes local position
            metagraph.getChildren(action.data).forEach(node => {
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