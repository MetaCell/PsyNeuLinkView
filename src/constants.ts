export enum Direction {
  INPUT = 'in',
  OUTPUT = 'out',
}

export enum GVTypes {
  COMPOSITION = 'digraph',
  MECHANISM = 'node_stmt',
  PROJECTION = 'edge_stmt',
}

export enum PNLClasses {
  COMPOSITION = 'Composition',
  PROJECTION = 'Projection',
}

export enum PNLMechanisms {
  MECHANISM = 'ProcessingMechanism',
  PROCESSING_MECH = 'ProcessingMechanism',
  DEFAULT_PROCESSING_MECH = 'DefaultProcessingMechanism',
  LEARNING_MECH = 'LearningMechanism',
  AUTO_LEARNING_MECH = 'AutoAssociativeLearningMechanism',
  GATING_MECH = 'GatingMechanism',
  CTRL_MECH = 'ControlMechanism',
  AGT_CTRL_MECH = 'AGTControlMechanism',
  OPT_CTRL_MECH = 'OptimizationControlMechanism',
  LC_CTRL_MECH = 'LCControlMechanism',
  MODULATORY_MECH = 'ModulatoryMechanism',
  COMPOSITION_MECH = 'CompositionInterfaceMechanism',
  INTEGRATOR_MECH = 'IntegratorMechanism',
  OBJ_MECH = 'ObjectiveMechanism',
  TRANSFER_MECH = 'TransferMechanism',
  RECURRENT_TRANSFER_MECH = 'RecurrentTransferMechanism',
  DDM = 'DDM',
  EPISODIC_MECH = 'EpisodicMemoryMechanism',
  COMPARATOR_MECH = 'ComparatorMechanism',
  PREDICTION_ERROR_MECH = 'PredictionErrorMechanism',
  CONTRASTIVE_MECH = 'ContrastiveHebbianMechanism',
  KOHONEN_LEARNING_MECH = 'KohonenLearningMechanism',
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

export const snapshotPositionLabel = 'snapshotPosition';

// fixme: we should be getting this from styles
// container border size in (rem * pixels per rem) * 2 to work around the corner border radius
export const clipPathBorderSize = 0.125 * 25 * 2;
