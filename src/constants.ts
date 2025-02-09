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
export const PNLDefaults = 'Defaults';
export const PNLLoggables = 'Loggables';

export enum PNLClasses {
  COMPOSITION = 'Composition',
  EM_COMPOSITION = 'EMComposition',
  AUTODIFF_COMPOSITION = 'AutodiffComposition',
  PROJECTION = 'Projection',
}

export enum PNLMechanisms {
  MECHANISM = 'Mechanism',
  TRANSFER_MECH = 'TransferMechanism',
  PROCESSING_MECH = 'ProcessingMechanism',
  LEARNING_MECH = 'LearningMechanism',
  MODULATORY_MECH = 'ModulatoryMechanism_Base',
  OBJ_MECH = 'ObjectiveMechanism',
  CTRL_MECH = 'ControlMechanism',
  GATING_MECH = 'GatingMechanism',
  DEFAULT_PROCESSING_MECH = 'DefaultProcessingMechanism_Base',
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

export enum PNLFunctions {
  CONCATENATE = 'Concatenate',
  REARRANGE = 'Rearrange',
  REDUCE = 'Reduce',
  LINEARCOMBINATION = 'LinearCombination',
  COMBINEMEANS = 'CombineMeans',
  PREDICTIONERRORDELTAFUNCTION = 'PredictionErrorDeltaFunction',
  NORMALDIST = 'NormalDist',
  UNIFORMTONORMALDIST = 'UniformToNormalDist',
  EXPONENTIALDIST = 'ExponentialDist',
  UNIFORMDIST = 'UniformDist',
  GAMMADIST = 'GammaDist',
  WALDDIST = 'WaldDist',
  BAYESGLM = 'BayesGLM',
  KOHONEN = 'Kohonen',
  HEBBIAN = 'Hebbian',
  CONTRASTIVEHEBBIAN = 'ContrastiveHebbian',
  REINFORCEMENT = 'Reinforcement',
  BACKPROPAGATION = 'BackPropagation',
  TDLEARNING = 'TDLearning',
  STABILITY = 'Stability',
  ENERGY = 'Energy',
  ENTROPY = 'Entropy',
  DISTANCE = 'Distance',
  OPTIMIZATIONFUNCTION = 'OptimizationFunction',
  GRADIENTOPTIMIZATION = 'GradientOptimization',
  GRIDSEARCH = 'GridSearch',
  GAUSSIANPROCESS = 'GaussianProcess',
  ONEHOT = 'OneHot',
  IDENTITY = 'Identity',
  LINEAR = 'Linear',
  EXPONENTIAL = 'Exponential',
  LOGISTIC = 'Logistic',
  TANH = 'Tanh',
  RELU = 'ReLU',
  ANGLE = 'Angle',
  GAUSSIAN = 'Gaussian',
  GAUSSIANDISTORT = 'GaussianDistort',
  SOFTMAX = 'SoftMax',
  LINEARMATRIX = 'LinearMatrix',
  TRANSFERWITHCOSTS = 'TransferWithCosts',
  INTEGRATORFUNCTION = 'IntegratorFunction',
  ACCUMULATORINTEGRATOR = 'AccumulatorIntegrator',
  SIMPLEINTEGRATOR = 'SimpleIntegrator',
  ADAPTIVEINTEGRATOR = 'AdaptiveIntegrator',
  DUALADAPTIVEINTEGRATOR = 'DualAdaptiveIntegrator',
  DRIFTDIFFUSIONINTEGRATOR = 'DriftDiffusionIntegrator',
  DRIFTONASPHEREINTEGRATOR = 'DriftOnASphereIntegrator',
  ORNSTEINUHLENBECKINTEGRATOR = 'OrnsteinUhlenbeckIntegrator',
  INTERACTIVEACTIVATIONINTEGRATOR = 'InteractiveActivationIntegrator',
  LEAKYCOMPETINGINTEGRATOR = 'LeakyCompetingIntegrator',
  FITZHUGHNAGUMOINTEGRATOR = 'FitzHughNagumoIntegrator',
}

export enum GUIViews {
  EDIT = 'build',
  VIEW = 'visualise',
}

export enum modelState {
  MODEL_EMPTY = 'model_empty',
  MODEL_LOADED = 'model_loaded',
}

export enum updateStates {
  UPDATE_DONE = 'update_done',
  UPDATE_IN_PROGRESS = 'update_in_progress',
}

export const RESIZE_CHANGED_POS_OPTION = 'resizeChangedPosition';
export const SNAPSHOT_DIMENSIONS = 'snapshotDimensions';

// fixme: we should be getting this from styles
export const FONTSIZE = 16;
export const COMPOSITION_BORDER_SIZE = 0.125 * FONTSIZE * 2.5; // container border size in (rem * pixels per rem) * 2 to work around the corner border radius
export const MECHANISM_BORDER_SIZE = 0.09375 * FONTSIZE; // selected border size in (rem * pixels per rem)
export const MECHANISM_TOP_CHIP_ADJUSTMENT = 2.625 * FONTSIZE; // top adjustment in (rem * pixels per rem)
export const COMPOSITION_TOP_CHIP_ADJUSTMENT = 1.75 * FONTSIZE; // top adjustment in (rem * pixels per rem)

export const MECHANISM_Z_INDEX = '10000';

export const BASE_ZOOM = 100;
