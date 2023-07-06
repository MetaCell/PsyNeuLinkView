export enum Direction {
  INPUT = 'in',
  OUTPUT = 'out',
}

export enum GVTypes {
  COMPOSITION = 'digraph',
  MECHANISM = 'node_stmt',
  PROJECTION = 'edge_stmt',
}

export enum GVKeys {
  COMPOSITIONS = 'compositions',
  MECHANISMS = 'mechanisms',
  PROJECTIONS = 'projections',
}

export enum InputTypes {
  RAW = 'raw',
  FILE = 'file',
  OBJECT = 'object',
}

export const PNLSummary = 'Summary';

export enum PNLClasses {
  COMPOSITION = 'Composition',
  PROJECTION = 'Projection',
}

export enum PNLMechanisms {
  MECHANISM = 'Mechanism',
  TRANSFER_MECH = 'TransferMechanism',
  PROCESSING_MECH = 'ProcessingMechanism',
  LEARNING_MECH = 'LearningMechanism',
  MODULATORY_MECH = 'ModulatoryMechanism',
  OBJ_MECH = 'ObjectiveMechanism',
  CTRL_MECH = 'ControlMechanism',
  GATING_MECH = 'GatingMechanism',
  DEFAULT_PROCESSING_MECH = 'DefaultProcessingMechanism',
  AUTO_LEARNING_MECH = 'AutoAssociativeLearningMechanism',
  AGT_CTRL_MECH = 'AGTControlMechanism',
  OPT_CTRL_MECH = 'OptimizationControlMechanism',
  LC_CTRL_MECH = 'LCControlMechanism',
  COMPOSITION_MECH = 'CompositionInterfaceMechanism',
  INTEGRATOR_MECH = 'IntegratorMechanism',
  RECURRENT_TRANSFER_MECH = 'RecurrentTransferMechanism',
  DDM = 'DDM',
  EPISODIC_MECH = 'EpisodicMemoryMechanism',
  COMPARATOR_MECH = 'ComparatorMechanism',
  PREDICTION_ERROR_MECH = 'PredictionErrorMechanism',
  KOHONEN_LEARNING_MECH = 'KohonenLearningMechanism',
  CONTRASTIVE_MECH = 'ContrastiveHebbianMechanism',
  KOHONEN_MECH = 'KohonenMechanism',
  KWTA_MECH = 'KWTAMechanism',
  LCA_MECH = 'LCAMechanism',
}

export enum GUIViews {
  EDIT = 'gui_edit',
  VIEW = 'gui_view',
}

export enum modelState {
  MODEL_EMPTY = 'model_empty',
  MODEL_LOADED = 'model_loaded',
}

export enum updateStates {
  UPDATE_DONE = 'update_done',
  UPDATE_IN_PROGRESS = 'update_in_progress',
}

export const resizeChangedPositionOption = 'resizeChangedPosition';

// fixme: we should be getting this from styles
// container border size in (rem * pixels per rem) * 2 to work around the corner border radius
export const snapshotDimensionsLabel = 'snapshotDimensions';

// fixme: we should be getting this from styles
export const fontsize = 16;
export const clipPathParentBorderSize = 0.125 * fontsize * 2.5; // container border size in (rem * pixels per rem) * 2 to work around the corner border radius
export const showPropertiesAdjustment = -2.625 * fontsize; // top adjustment in (rem * pixels per rem)
export const clipPathSelectedBorder = 0.09375 * fontsize; // selected border size in (rem * pixels per rem)

