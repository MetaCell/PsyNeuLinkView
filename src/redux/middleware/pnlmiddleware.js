import {
    CLOSE_COMPOSITION,
    LOAD_MODEL, OPEN_COMPOSITION,
    UPDATE_MODEL
} from "../actions/general";
import {modelUpdated} from "../actions/general";
import ModelSingleton from "../../model/ModelSingleton";
import {snapshotDimensionsLabel} from "../../constants";
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
            action.data.setOption(snapshotDimensionsLabel, {
                width: action.data.width,
                height: action.data.height,
                position: {x:action.data.position.x, y:action.data.position.y}
            })
            const model = ModelSingleton.getInstance();
            updateCompositionDimensions(action.data, model.getMetaGraph().getChildren(action.data));
            break;
        }

        case CLOSE_COMPOSITION: {
            const {width, height, position } = action.data.getOption(snapshotDimensionsLabel)
            action.data.position = new Point(position.x, position.y);
            action.data.updateDimensions({width, height});
            action.data.setOption(snapshotDimensionsLabel, undefined)
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