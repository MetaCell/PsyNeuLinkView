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
    COMPOSITION = 'Composition',
    PROJECTION = 'Projection'
}

export enum PNLMechanisms {
    MECHANISM = 'ProcessingMechanism',
    PROCESSING_MECH = 'ProcessingMechanism',
    LEARNING_MECH = 'LearningMechanism',
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
export const clipPathBorderSize = (0.125 * 25) * 2 // container border size in (rem * pixels per rem) * 2 to work around the corner border radius
export const clipPathBorderBuffer = 10
export const clipPathHorizontalBorderBuffer = clipPathBorderBuffer + 2