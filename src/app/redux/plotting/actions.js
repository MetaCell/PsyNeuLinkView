import { ACTION_TYPES as atypes } from "./constants";
import { KEYWORDS as subplotGridKeywords } from "./subplot-grid/constants";
import { AUTO } from "../constants";

export function initializeSubplotBundle(
    // args for general use
    id,
    // args for subplot
    plotType = AUTO,
    name = AUTO,
    dataSources = AUTO,
    // args for subplot grid
    position,
    colSpan = AUTO,
    rowSpan = AUTO
) {
    return {
        type: atypes.INITIALIZE_SUBPLOT_BUNDLE,
        id: id,
        plotType: plotType,
        name: name,
        dataSources: dataSources,
        position: position,
        colSpan: colSpan,
        rowSpan: rowSpan
    }
}