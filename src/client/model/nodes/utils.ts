import { PNLClasses, PNLFunctions, PNLLoggables, PNLMechanisms } from '../../../constants';

export interface ExtraObject {
  position?: {
    x: number;
    y: number;
  };
  boundingBox?: {
    llx: number;
    lly: number;
    urx: number;
    ury: number;
  };
  isExpanded?: Boolean;
  icon?: string;
  height?: number;
  width?: number;
  [PNLLoggables]?: any;
}

export const MechanismToVariant: any = {
  [PNLMechanisms.PROCESSING_MECH]: 'node-blue',
  [PNLMechanisms.DEFAULT_PROCESSING_MECH]: 'node-blue',
  [PNLMechanisms.LEARNING_MECH]: 'node-blue',
  [PNLMechanisms.AUTO_LEARNING_MECH]: 'node-blue',
  [PNLMechanisms.GATING_MECH]: 'node-blue',
  [PNLMechanisms.CTRL_MECH]: 'node-blue',
  [PNLMechanisms.AGT_CTRL_MECH]: 'node-blue',
  [PNLMechanisms.OPT_CTRL_MECH]: 'node-blue',
  [PNLMechanisms.LC_CTRL_MECH]: 'node-blue',
  [PNLMechanisms.MODULATORY_MECH]: 'node-blue',
  [PNLMechanisms.COMPOSITION_MECH]: 'node-blue',
  [PNLMechanisms.INTEGRATOR_MECH]: 'node-blue',
  [PNLMechanisms.OBJ_MECH]: 'node-blue',
  [PNLMechanisms.TRANSFER_MECH]: 'node-blue',
  [PNLMechanisms.RECURRENT_TRANSFER_MECH]: 'node-blue',
  [PNLMechanisms.DDM]: 'node-blue',
  [PNLMechanisms.EPISODIC_MECH]: 'node-blue',
  [PNLMechanisms.COMPARATOR_MECH]: 'node-blue',
  [PNLMechanisms.PREDICTION_ERROR_MECH]: 'node-blue',
  [PNLMechanisms.CONTRASTIVE_MECH]: 'node-blue',
  [PNLMechanisms.KOHONEN_LEARNING_MECH]: 'node-blue',
  [PNLMechanisms.KOHONEN_MECH]: 'node-blue',
  [PNLMechanisms.KWTA_MECH]: 'node-blue',
  [PNLMechanisms.LCA_MECH]: 'node-blue',
};

export const MetaNodeToOptions: any = {
  [PNLClasses.COMPOSITION]: {},
  [PNLClasses.EM_COMPOSITION]: {},
  [PNLClasses.AUTODIFF_COMPOSITION]: {},
  [PNLMechanisms.PROCESSING_MECH]: {
    function: '',
  },
  [PNLMechanisms.DEFAULT_PROCESSING_MECH]: {
    function: '',
  },
  [PNLMechanisms.LEARNING_MECH]: {
    error_sources: '',
    function: '',
    learning_rate: '',
    modulation: '',
    error_matrices: '',
    learning_enabled: false,
    error_matrix: '', //matrix
  },
  [PNLMechanisms.AUTO_LEARNING_MECH]: {
    function: '',
    learning_rate: '',
    primary_learned_projection: '',
    learned_projections: '',
    error_sources: '',
    modulation: '',
  },
  [PNLMechanisms.GATING_MECH]: {
    default_gating_allocation: '',
    monitor_for_gating: '',
    function: '',
    default_allocation: '',
    gate: '',
    modulation: '',
  },
  [PNLMechanisms.CTRL_MECH]: {
    monitor_for_control: '',
    objective_mechanism: '',
    allow_probes: false,
    function: '',
    default_allocation: '',
    control: '', //ControlSignal specification or list[ControlSignal specification
    modulation: '', //str
    combine_costs: '', //function
    compute_reconfiguration_cost: '', //function
    compute_net_outcome: '', //function
    reconfiguration_cost: '',
    costs: '',
    combined_costs: '',
  },
  [PNLMechanisms.AGT_CTRL_MECH]: {
    objective_mechanism: '', //ObjectiveMechanism
    function: '', //function
  },
  [PNLMechanisms.OPT_CTRL_MECH]: {
    state_features: '',
    state_feature_default: '',
    state_feature_function: '', //function
    agent_rep: '',
    initial_seed: '',
    num_estimates: '',
    random_variables: '',
    same_seed_for_all_parameter_combinations: false,
    num_trials_per_estimate: '',
    search_function: '', // function
    search_termination_function: '', // function
    search_space: '',
    function: '',
    search_statefulness: true,
  },
  [PNLMechanisms.LC_CTRL_MECH]: {
    modulated_mechanisms: '',
    initial_w_FitzHughNagumo: '', //float
    initial_v_FitzHughNagumo: '', //float
    time_step_size_FitzHughNagumo: '', //float
    t_0_FitzHughNagumo: '', //float
    a_v_FitzHughNagumo: '', //float
    b_v_FitzHughNagumo: '', //float
    c_v_FitzHughNagumo: '', //float
    d_v_FitzHughNagumo: '', //float
    e_v_FitzHughNagumo: '', //float
    f_v_FitzHughNagumo: '', //float
    threshold_FitzHughNagumo: '', //float
    time_constant_v_FitzHughNagumo: '', //float
    a_w_FitzHughNagumo: '', //float
    b_w_FitzHughNagumo: '', //float
    c_w_FitzHughNagumo: '', //float
    mode_FitzHughNagumo: '', //float
    uncorrelated_activity_FitzHughNagumo: '', //float
    time_constant_w_FitzHughNagumo: '', //float
    integration_method: '', //float
    base_level_gain: '', //float
    scaling_factor_gain: '', //float
    function: '',
    objective_mechanism: '',
    modulation: '', //str
  },
  [PNLMechanisms.MODULATORY_MECH]: {
    modulation: '',
    function: '',
  },
  [PNLMechanisms.COMPOSITION_MECH]: {
    function: '',
    port_map: '', //
    composition: '',
  },
  [PNLMechanisms.INTEGRATOR_MECH]: {
    function: '',
  },
  [PNLMechanisms.OBJ_MECH]: {
    monitor: '',
    function: '',
    monitor_weights_and_exponents: '', //list
    modulatory_mechanism: '',
  },
  [PNLMechanisms.TRANSFER_MECH]: {
    noise: '',
    clip: 'Tuple = ()', //Tuple
    integrator_mode: false,
    integrator_function: '',
    integration_rate: '',
    on_resume_integrator_mode: '', //str
    termination_measure: '', //function
    termination_threshold: '',
    termination_comparison_op: '',
  },
  [PNLMechanisms.RECURRENT_TRANSFER_MECH]: {
    matrix: '',
    auto: '',
    hetero: '',
    has_recurrent_input_port: false,
    combination_function: '',
    enable_learning: false,
    learning_rate: false,
    learning_function: '',
    learning_enabled: false,
    integration_rate: '',
    noise: '',
    smoothing_factor: '',
    function: '',
  },
  [PNLMechanisms.DDM]: {
    function: '',
    standard_output_ports: '', //list[str]
    initializer: '',
    input_format: '',
    stimulus: '',
  },
  [PNLMechanisms.EPISODIC_MECH]: {
    function: '',
  },
  [PNLMechanisms.COMPARATOR_MECH]: {
    function: '',
  },
  [PNLMechanisms.PREDICTION_ERROR_MECH]: {
    function: '',
    learning_rate: '',
  },
  [PNLMechanisms.CONTRASTIVE_MECH]: {
    input_size: '',
    hidden_size: '',
    target_size: '',
    separated: true,
    mode: '',
    combination_function: '',
    clamp: '',
    continuous: true,
    minus_phase_termination_condition: '',
    minus_phase_termination_threshold: '',
    plus_phase_termination_condition: '',
    plus_phase_termination_threshold: '',
    phase_convergence_function: '',
    max_passes: '',
    learning_function: '',
  },
  [PNLMechanisms.KOHONEN_LEARNING_MECH]: {
    modulation: '',
    learning_rate: '',
    activity_source: '',
    function: '', //function
  },
  [PNLMechanisms.KOHONEN_MECH]: {
    selection_function: '',
    enable_learning: true,
    learning_rate: '',
    learning_function: '',
    distance_function: '',
    matrix: '',
    learning_enabled: false,
    function: '', //function
  },
  [PNLMechanisms.KWTA_MECH]: {
    k_value: '', //number, float
    threshold: '', //number, float
    ratio: '', //number, float
    average_based: false, //bool
    inhibition_only: true, //bool
    function: '', //function
    matrix: '', //matrix
  },
  [PNLMechanisms.LCA_MECH]: {
    leak: '', //value
    competition: '', //value
    self_excitation: '', //value
    time_step_size: '', //float
    threshold: '', //float
    threshold_criterion: '', //str
    matrix: '', //2d np.array
    auto: '', //float
    function: '', //function
    hetero: '', //float
    integrator_function: '', //function
    integrator_mode: true, //bool
    termination_measure: '', //types.FunctionType
  },
};


export const OptionsTypes: any = {
  [PNLMechanisms.PROCESSING_MECH]: {
    function: {type: 'function'},
  },
  [PNLMechanisms.DEFAULT_PROCESSING_MECH]: {
    function: {type: 'function'},
  },
  [PNLMechanisms.LEARNING_MECH]: {
    error_sources: {type: 'string'},
    function: {type: 'function'},
    learning_rate: {type: 'string'},
    modulation: {type: 'string'},
    error_matrices: {type: 'string'},
    learning_enabled: {type: 'boolean'},
    error_matrix: {type: 'string'},
  },
  [PNLMechanisms.AUTO_LEARNING_MECH]: {
    function: {type: 'function'},
    learning_rate: {type: 'string'},
    primary_learned_projection: {type: 'string'},
    learned_projections: {type: 'string'},
    error_sources: {type: 'string'},
    modulation: {type: 'string'},
  },
  [PNLMechanisms.GATING_MECH]: {
    default_gating_allocation: {type: 'string'},
    monitor_for_gating: {type: 'string'},
    function: {type: 'function'},
    default_allocation: {type: 'string'},
    gate: {type: 'string'},
    modulation: {type: 'string'},
  },
  [PNLMechanisms.CTRL_MECH]: {
    monitor_for_control: {type: 'string'},
    objective_mechanism: {type: 'string'},
    allow_probes: {type: 'boolean'},
    function: {type: 'function'},
    default_allocation: {type: 'string'},
    control: {type: 'string'}, //ControlSignal specification or list[ControlSignal specification
    modulation: {type: 'string'},
    combine_costs: {type: 'function'},
    compute_reconfiguration_cost: {type: 'function'},
    compute_net_outcome: {type: 'function'},
    reconfiguration_cost: {type: 'string'},
    costs: {type: 'string'},
    combined_costs: {type: 'string'},
  },
  [PNLMechanisms.AGT_CTRL_MECH]: {
    objective_mechanism: {type: 'string'}, //ObjectiveMechanism
    function: {type: 'function'},
  },
  [PNLMechanisms.OPT_CTRL_MECH]: {
    state_features: {type: 'string'},
    state_feature_default: {type: 'string'},
    state_feature_function: {type: 'function'},
    agent_rep: {type: 'string'},
    initial_seed: {type: 'string'},
    num_estimates: {type: 'string'},
    random_variables: {type: 'string'},
    same_seed_for_all_parameter_combinations: {type: 'boolean'},
    num_trials_per_estimate: {type: 'string'},
    search_function: {type: 'function'},
    search_termination_function: {type: 'function'},
    search_space: {type: 'string'},
    function: {type: 'string'},
    search_statefulness: {type: 'boolean'},
  },
  [PNLMechanisms.LC_CTRL_MECH]: {
    modulated_mechanisms: {type: 'string'},
    initial_w_FitzHughNagumo: {type: 'float'},
    initial_v_FitzHughNagumo: {type: 'float'},
    time_step_size_FitzHughNagumo: {type: 'float'},
    t_0_FitzHughNagumo: {type: 'float'},
    a_v_FitzHughNagumo: {type: 'float'},
    b_v_FitzHughNagumo: {type: 'float'},
    c_v_FitzHughNagumo: {type: 'float'},
    d_v_FitzHughNagumo: {type: 'float'},
    e_v_FitzHughNagumo: {type: 'float'},
    f_v_FitzHughNagumo: {type: 'float'},
    threshold_FitzHughNagumo: {type: 'float'},
    time_constant_v_FitzHughNagumo: {type: 'float'},
    a_w_FitzHughNagumo: {type: 'float'},
    b_w_FitzHughNagumo: {type: 'float'},
    c_w_FitzHughNagumo: {type: 'float'},
    mode_FitzHughNagumo: {type: 'float'},
    uncorrelated_activity_FitzHughNagumo: {type: 'float'},
    time_constant_w_FitzHughNagumo: {type: 'float'},
    integration_method: {type: 'float'},
    base_level_gain: {type: 'float'},
    scaling_factor_gain: {type: 'float'},
    function: {type: 'string'},
    objective_mechanism: {type: 'string'},
    modulation: {type: 'string'},
  },
  [PNLMechanisms.MODULATORY_MECH]: {
    modulation: {type: 'string'},
    function: {type: 'string'},
  },
  [PNLMechanisms.COMPOSITION_MECH]: {
    function: {type: 'string'},
    port_map: {type: 'string'}, //
    composition: {type: 'string'},
  },
  [PNLMechanisms.INTEGRATOR_MECH]: {
    function: {type: 'string'},
  },
  [PNLMechanisms.OBJ_MECH]: {
    monitor: {type: 'string'},
    function: {type: 'string'},
    monitor_weights_and_exponents: {type: 'string'}, //list
    modulatory_mechanism: {type: 'string'},
  },
  [PNLMechanisms.TRANSFER_MECH]: {
    noise: {type: 'string'},
    clip: 'Tuple = ()', //Tuple
    integrator_mode: {type: 'boolean'},
    integrator_function: {type: 'function'},
    integration_rate: {type: 'string'},
    on_resume_integrator_mode: {type: 'string'},
    termination_measure: {type: 'function'},
    termination_threshold: {type: 'string'},
    termination_comparison_op: {type: 'string'},
  },
  [PNLMechanisms.RECURRENT_TRANSFER_MECH]: {
    matrix: {type: 'string'},
    auto: {type: 'string'},
    hetero: {type: 'string'},
    has_recurrent_input_port: {type: 'boolean'},
    combination_function: {type: 'string'},
    enable_learning: {type: 'boolean'},
    learning_rate: {type: 'boolean'},
    learning_function: {type: 'string'},
    learning_enabled: {type: 'boolean'},
    integration_rate: {type: 'string'},
    noise: {type: 'string'},
    smoothing_factor: {type: 'string'},
    function: {type: 'function'},
  },
  [PNLMechanisms.DDM]: {
    function: {type: 'function'},
    standard_output_ports: {type: 'string'}, //list[str]
    initializer: {type: 'string'},
    input_format: {type: 'string'},
    stimulus: {type: 'string'},
  },
  [PNLMechanisms.EPISODIC_MECH]: {
    function: {type: 'function'},
  },
  [PNLMechanisms.COMPARATOR_MECH]: {
    function: {type: 'function'},
  },
  [PNLMechanisms.PREDICTION_ERROR_MECH]: {
    function: {type: 'function'},
    learning_rate: {type: 'string'},
  },
  [PNLMechanisms.CONTRASTIVE_MECH]: {
    input_size: {type: 'string'},
    hidden_size: {type: 'string'},
    target_size: {type: 'string'},
    separated: {type: 'boolean'},
    mode: {type: 'string'},
    combination_function: {type: 'string'},
    clamp: {type: 'string'},
    continuous: {type: 'boolean'},
    minus_phase_termination_condition: {type: 'string'},
    minus_phase_termination_threshold: {type: 'string'},
    plus_phase_termination_condition: {type: 'string'},
    plus_phase_termination_threshold: {type: 'string'},
    phase_convergence_function: {type: 'string'},
    max_passes: {type: 'string'},
    learning_function: {type: 'function'},
  },
  [PNLMechanisms.KOHONEN_LEARNING_MECH]: {
    modulation: {type: 'string'},
    learning_rate: {type: 'string'},
    activity_source: {type: 'string'},
    function: {type: 'function'},
  },
  [PNLMechanisms.KOHONEN_MECH]: {
    selection_function: {type: 'string'},
    enable_learning: {type: 'boolean'},
    learning_rate: {type: 'string'},
    learning_function: {type: 'function'},
    distance_function: {type: 'function'},
    matrix: {type: 'string'},
    learning_enabled: {type: 'boolean'},
    function: {type: 'function'},
  },
  [PNLMechanisms.KWTA_MECH]: {
    k_value: {type: 'float'},
    threshold: {type: 'float'},
    ratio: {type: 'float'},
    average_based: {type: 'boolean'},
    inhibition_only: {type: 'boolean'},
    function: {type: 'function'},
    matrix: {type: 'string'}, //matrix
  },
  [PNLMechanisms.LCA_MECH]: {
    leak: {type: 'string'},
    competition: {type: 'string'},
    self_excitation: {type: 'string'},
    time_step_size: {type: 'float'},
    threshold: {type: 'float'},
    threshold_criterion: {type: 'string'},
    matrix: {type: 'string'}, //2d np.array
    auto: {type: 'float'},
    function: {type: 'function'},
    hetero: {type: 'float'},
    integrator_function: {type: 'function'},
    integrator_mode: {type: 'boolean'},
    termination_measure: {type: 'function'},
  },
};

export const FunctionsParams: any = {
  [PNLFunctions.CONCATENATE]: {},
  [PNLFunctions.REARRANGE]: {},
  [PNLFunctions.REDUCE]: {},
  [PNLFunctions.LINEARCOMBINATION]: {},
  [PNLFunctions.COMBINEMEANS]: {},
  [PNLFunctions.PREDICTIONERRORDELTAFUNCTION]: {},
  [PNLFunctions.NORMALDIST]: {},
  [PNLFunctions.UNIFORMTONORMALDIST]: {},
  [PNLFunctions.EXPONENTIALDIST]: {},
  [PNLFunctions.UNIFORMDIST]: {},
  [PNLFunctions.GAMMADIST]: {},
  [PNLFunctions.WALDDIST]: {},
  [PNLFunctions.BAYESGLM]: {},
  [PNLFunctions.KOHONEN]: {},
  [PNLFunctions.HEBBIAN]: {},
  [PNLFunctions.CONTRASTIVEHEBBIAN]: {},
  [PNLFunctions.REINFORCEMENT]: {},
  [PNLFunctions.BACKPROPAGATION]: {},
  [PNLFunctions.TDLEARNING]: {},
  [PNLFunctions.STABILITY]: {},
  [PNLFunctions.ENERGY]: {},
  [PNLFunctions.ENTROPY]: {},
  [PNLFunctions.DISTANCE]: {},
  [PNLFunctions.OPTIMIZATIONFUNCTION]: {},
  [PNLFunctions.GRADIENTOPTIMIZATION]: {},
  [PNLFunctions.GRIDSEARCH]: {},
  [PNLFunctions.GAUSSIANPROCESS]: {},
  [PNLFunctions.ONEHOT]: {},
  [PNLFunctions.IDENTITY]: {},
  [PNLFunctions.LINEAR]: {
    default_variable: {type: 'array', required: false},
    slope: {type: 'float', required: true},
    intercept: {type: 'float', required: true},
    params: {type: 'dict', required: false},
    name: {type: 'string', required: false},
    prefs: {type: 'dict', required: false},
  },
  [PNLFunctions.EXPONENTIAL]: {},
  [PNLFunctions.LOGISTIC]: {},
  [PNLFunctions.TANH]: {},
  [PNLFunctions.RELU]: {},
  [PNLFunctions.ANGLE]: {},
  [PNLFunctions.GAUSSIAN]: {},
  [PNLFunctions.GAUSSIANDISTORT]: {},
  [PNLFunctions.SOFTMAX]: {},
  [PNLFunctions.LINEARMATRIX]: {},
  [PNLFunctions.TRANSFERWITHCOSTS]: {},
  [PNLFunctions.INTEGRATORFUNCTION]: {},
  [PNLFunctions.ACCUMULATORINTEGRATOR]: {},
  [PNLFunctions.SIMPLEINTEGRATOR]: {},
  [PNLFunctions.ADAPTIVEINTEGRATOR]: {},
  [PNLFunctions.DUALADAPTIVEINTEGRATOR]: {},
  [PNLFunctions.DRIFTDIFFUSIONINTEGRATOR]: {},
  [PNLFunctions.DRIFTONASPHEREINTEGRATOR]: {},
  [PNLFunctions.ORNSTEINUHLENBECKINTEGRATOR]: {},
  [PNLFunctions.INTERACTIVEACTIVATIONINTEGRATOR]: {},
  [PNLFunctions.LEAKYCOMPETINGINTEGRATOR]: {},
  [PNLFunctions.FITZHUGHNAGUMOINTEGRATOR]: {},
};
