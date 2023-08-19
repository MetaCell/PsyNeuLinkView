import {
    CLOSE_COMPOSITION,
    OPEN_COMPOSITION,
    UPDATE_MODEL,
    CHANGE_VIEW,
} from "../actions/general";
import {Point} from "@projectstorm/geometry";
import {modelUpdated} from "../actions/general";
import {SNAPSHOT_DIMENSIONS} from "../../../constants";
import ModelSingleton from "../../model/ModelSingleton";
import { DroppableChartWidget, LogViewerWidget } from "../../layout/widgets";
import * as GeppettoActions from '@metacell/geppetto-meta-client/common/actions';
import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';


// eslint-disable-next-line import/no-anonymous-default-export
export default (store) => (next) => (action) => {
    let performUpdate = true;
    switch (action.type) {
        case GeppettoActions.layoutActions.UPDATE_WIDGET: {
            const widget = action.data;
            if (widget.panelName === 'border_bottom' && widget.status === WidgetStatus.MINIMIZED) {
                next(GeppettoActions.destroyWidget(widget.id));
                performUpdate = false;
            }
            break;
        }
        case CHANGE_VIEW: {
            let setWidgetsCondition = true
            if (Object.keys(store.getState().widgets).length > 0) {
                setWidgetsCondition = false
            }

            if (setWidgetsCondition) {
                next(GeppettoActions.setWidgets({
                    [DroppableChartWidget.id]: {
                        ...DroppableChartWidget,
                        panelName: DroppableChartWidget.defaultPanel,
                        status: WidgetStatus.ACTIVE,
                    },
                    [LogViewerWidget.id]: {
                        ...LogViewerWidget,
                        panelName: LogViewerWidget.defaultPanel,
                        status: WidgetStatus.ACTIVE,
                    }
                }));
            }
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
};
