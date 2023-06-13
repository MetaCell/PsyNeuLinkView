import { PNLMechanisms } from '../../../constants';

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
}

export const MechanismToVariant: any = {
  [PNLMechanisms.PROCESSING_MECH]: 'node-blue',
  [PNLMechanisms.DEFAULT_PROCESSING_MECH]: 'node-blue',
  [PNLMechanisms.LEARNING_MECH]: 'node-red',
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
  [PNLMechanisms.PROCESSING_MECH]: {
    function: 'linear',
  },
  [PNLMechanisms.DEFAULT_PROCESSING_MECH]: {
    function: 'N/A',
  },
  [PNLMechanisms.LEARNING_MECH]: {
    error_sources: '',
    function: 'None',
    learning_rate: '0.5',
    modulation: 'ADDICTIVE',
    error_matrices: '',
    learning_enabled: false,
    error_matrix: '', //matrix
  },
  [PNLMechanisms.AUTO_LEARNING_MECH]: {
    function: 'Hebbian',
    learning_rate: 'None',
    primary_learned_projection: '',
    learned_projections: '',
    error_sources: '',
    modulation: 'ADDICTIVE',
  },
  [PNLMechanisms.GATING_MECH]: {
    default_gating_allocation: '',
    monitor_for_gating: '',
    function: 'linear',
    default_allocation: '',
    gate: '',
    modulation: 'None',
  },
  [PNLMechanisms.CTRL_MECH]: {
    monitor_for_control: '',
    objective_mechanism: '',
    allow_probes: false,
    function: 'Linear(slope=1, intercept=0)',
    default_allocation: '',
    control: 'N/A', //ControlSignal specification or list[ControlSignal specification
    modulation: 'MULTIPLICATIVE_PARAM', //str
    combine_costs: 'np.sum', //function
    compute_reconfiguration_cost: '', //function
    compute_net_outcome: 'lambda outcome', //function
    reconfiguration_cost: '',
    costs: 'None',
    combined_costs: 'N/A',
  },
  [PNLMechanisms.AGT_CTRL_MECH]: {
    objective_mechanism: 'N/A', //ObjectiveMechanism
    function: 'N/A', //function
  },
  [PNLMechanisms.OPT_CTRL_MECH]: {
    state_features: '',
    state_feature_default: '',
    state_feature_function: 'None', //function
    agent_rep: '',
    initial_seed: 'None',
    num_estimates: '1',
    random_variables: 'ALL',
    same_seed_for_all_parameter_combinations: false,
    num_trials_per_estimate: '',
    search_function: '', // function
    search_termination_function: '', // function
    search_space: 'N/A',
    function: '',
    search_statefulness: true,
  },
  [PNLMechanisms.LC_CTRL_MECH]: {
    modulated_mechanisms: 'None',
    initial_w_FitzHughNagumo: '0.0', //float
    initial_v_FitzHughNagumo: '0.0', //float
    time_step_size_FitzHughNagumo: '0.0', //float
    t_0_FitzHughNagumo: '0.0', //float
    a_v_FitzHughNagumo: '-1/3', //float
    b_v_FitzHughNagumo: '0.0', //float
    c_v_FitzHughNagumo: '1.0', //float
    d_v_FitzHughNagumo: '0.0', //float
    e_v_FitzHughNagumo: '-1.0', //float
    f_v_FitzHughNagumo: '1.0', //float
    threshold_FitzHughNagumo: '-1.0', //float
    time_constant_v_FitzHughNagumo: '-1.0', //float
    a_w_FitzHughNagumo: '1.0', //float
    b_w_FitzHughNagumo: '-0.8', //float
    c_w_FitzHughNagumo: '0.7', //float
    mode_FitzHughNagumo: '1.0', //float
    uncorrelated_activity_FitzHughNagumo: '0.0', //float
    time_constant_w_FitzHughNagumo: '12.5', //float
    integration_method: 'RK4', //float
    base_level_gain: '0.5', //float
    scaling_factor_gain: '3.0', //float
    function: 'FitzHughNagumoIntegrator',
    objective_mechanism: 'N/A',
    modulation: 'N/A', //str
  },
  [PNLMechanisms.MODULATORY_MECH]: {
    modulation: 'None',
    function: 'N/A',
  },
  [PNLMechanisms.COMPOSITION_MECH]: {
    function: 'Identity',
    port_map: '', //
    composition: '',
  },
  [PNLMechanisms.INTEGRATOR_MECH]: {
    function: 'AdaptiveIntegrator`(initializer=numpy.array([0]), rate=0.5)', // function
  },
  [PNLMechanisms.OBJ_MECH]: {
    monitor: '',
    function: 'LinearCombination',
    monitor_weights_and_exponents: '', //list
    modulatory_mechanism: '',
  },
  [PNLMechanisms.TRANSFER_MECH]: {
    noise: '0.0',
    clip: 'Tuple = ()', //Tuple
    integrator_mode: false,
    integrator_function: 'AdaptiveIntegrator',
    integration_rate: '0.5',
    on_resume_integrator_mode: 'CURRENT_VALUE', //str
    termination_measure: 'Distance(metric=MAX_ABS_DIFF)', //function
    termination_threshold: '',
    termination_comparison_op: '<=',
  },
  [PNLMechanisms.RECURRENT_TRANSFER_MECH]: {
    matrix: 'FULL_CONNECTIVITY_MATRIX',
    auto: '1',
    hetero: '0',
    has_recurrent_input_port: false,
    combination_function: 'LinearCombination',
    enable_learning: false,
    learning_rate: false,
    learning_function: 'Hebbian',
    learning_enabled: false,
    integration_rate: '0.5',
    noise: '0.0',
    smoothing_factor: '0.5',
    function: 'None',

    // integrator_mode: 'N/A', //UNLISTED
    // integrator_function: 'N/A', //UNLISTED
    // initial_value: 'N/A', //UNLISTED
    // clip: 'N/A', //UNLISTED
  },
  [PNLMechanisms.DDM]: {
    function: 'DriftDiffusionAnalytical',
    standard_output_ports: '', //list[str]
    initializer: 'numpy.array([[0]])',
    input_format: 'SCALAR',
    stimulus: '0.0',
  },
  [PNLMechanisms.EPISODIC_MECH]: {
    function: 'DictionaryMemory',
  },
  [PNLMechanisms.COMPARATOR_MECH]: {
    function: 'Distance(metric=DIFFERENCE)',
  },
  [PNLMechanisms.PREDICTION_ERROR_MECH]: {
    function: 'PredictionErrorDeltaFunction',
    learning_rate: '0.3',
  },
  [PNLMechanisms.CONTRASTIVE_MECH]: {
    input_size: '0',
    hidden_size: '0',
    target_size: '0',
    separated: true,
    mode: '',
    combination_function: '',
    clamp: 'HARD_CLAMP',
    continuous: true,
    minus_phase_termination_condition: 'CONVERGENCE',
    minus_phase_termination_threshold: '0.01',
    plus_phase_termination_condition: 'CONVERGENCE',
    plus_phase_termination_threshold: '0.01',
    phase_convergence_function: 'Distance(metric=MAX_ABS_DIFF)',
    max_passes: '1000',
    learning_function: 'ContrastiveHebbian',

    // auto: 'N/A', //UNLISTED
    // hetero: 'N/A', //UNLISTED
    // integrator_function: 'N/A', //UNLISTED
    // initial_value: 'N/A', //UNLISTED
    // noise: 'N/A', //UNLISTED
    // integration_rate: 'N/A', //UNLISTED
    // integrator_mode: 'N/A', //UNLISTED
    // clip: 'N/A', //UNLISTED
    // enable_learning: 'N/A', //UNLISTED
    // learning_rate: 'N/A', //UNLISTED
  },
  [PNLMechanisms.KOHONEN_LEARNING_MECH]: {
    modulation: 'ADDITIVE',
    learning_rate: 'None',
    activity_source: 'None',
    function: 'Kohonen', //function
  },
  [PNLMechanisms.KOHONEN_MECH]: {
    selection_function: '',
    enable_learning: true,
    learning_rate: 'False',
    learning_function: 'Kohonen(distance_function=GUASSIAN)',
    distance_function: 'Gaussian',
    matrix: 'AUTO_ASSIGN_MATRIX',
    learning_enabled: false,
    function: 'None', //function

    // integrator_function: '' ,//UNLISTED
    // initial_value: '' ,//UNLISTED
    // noise: '' ,//UNLISTED
    // integration_rate: '' ,//UNLISTED
    // integrator_mode: '' ,//UNLISTED
    // clip: '' ,//UNLISTED
    // additional_output_ports: '' ,//UNLISTED
  },
  [PNLMechanisms.KWTA_MECH]: {
    k_value: '0.5', //number, float
    threshold: '0', //number, float
    ratio: '0.5', //number, float
    average_based: false, //bool
    inhibition_only: true, //bool
    function: '', //function
    matrix: 'N/A', //matrix

    // auto: 'N/A', //UNLISTED
    // hetero: 'N/A', //UNLISTED
    // integrator_function: 'N/A', //UNLISTED
    // initial_value: 'N/A', //UNLISTED
    // noise: 'N/A', //UNLISTED
    // integration_rate: 'N/A', //UNLISTED
    // integrator_mode: 'N/A', //UNLISTED
    // clip: 'N/A', //UNLISTED
  },
  [PNLMechanisms.LCA_MECH]: {
    leak: '0.5', //value
    competition: '1.0', //value
    self_excitation: '0.0', //value
    time_step_size: '0.1', //float
    threshold: '0.0', //float
    threshold_criterion: 'N/A', //*VALUE*, *MAX_VS_NEXT*, *MAX_VS_AVG*, or *CONVERGENCE*
    matrix: 'N/A', //2d np.array
    auto: '0.0', //float
    function: 'Logistic', //function
    hetero: '-1.0', //float
    integrator_function: 'LeakyCompetingIntegrator', //function
    integrator_mode: true, //bool
    termination_measure: 'max', //types.FunctionType

    // noise: '', //UNLISTED
    // clip: '', //UNLISTED
    // integration_rate: '0.5', //UNLISTED
  },
};
