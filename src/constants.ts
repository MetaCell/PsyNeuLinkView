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