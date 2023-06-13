export enum Direction {
    INPUT = "in",
    OUTPUT = "out",
}

export enum GVTypes {
    COMPOSITION = 'digraph',
    MECHANISM = 'node_stmt',
    PROJECTION = 'edge_stmt'
}

export enum PNLClasses {
    COMPOSITION = 'composition',
    MECHANISM = 'mechanism',
    PROJECTION = 'projection'
}

export enum GUIViews {
    EDIT = 'gui_edit',
    VIEW = 'gui_view'
}

export enum modelState {
    MODEL_EMPTY = 'model_empty',
    MODEL_LOADED = 'model_loaded'
}

export enum updateStates {
    UPDATE_DONE = 'update_done',
    UPDATE_IN_PROGRESS = 'update_in_progress',
}

export const snapshotDimensionsLabel = 'snapshotDimensions'

// fixme: we should be getting this from styles
export const fontsize = 16
export const clipPathParentBorderSize = (0.125 * fontsize) * 2.5 // container border size in (rem * pixels per rem) * 2 to work around the corner border radius
export const clipPathTopAdjustment = -2.625 * fontsize // top adjustment in (rem * pixels per rem)
export const clipPathSelectedBorder = 0.09375 * fontsize // selected border size in (rem * pixels per rem)