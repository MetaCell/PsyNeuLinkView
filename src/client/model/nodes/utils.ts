import { PNLLoggables, PNLMechanisms } from '../../../constants';

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
    function_type: '',
    function_inputs: '',
    objective_mechanism: '',
    modulation: '', //str
  },
  [PNLMechanisms.MODULATORY_MECH]: {
    modulation: '',
    function: '',
  },
  [PNLMechanisms.COMPOSITION_MECH]: {
    function_inputs: '',
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
    // integrator_mode: '', //UNLISTED
    // integrator_function: '', //UNLISTED
    // initial_value: '', //UNLISTED
    // clip: '', //UNLISTED
  },
  [PNLMechanisms.DDM]: {
    function_inputs: '',
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
    // auto: '', //UNLISTED
    // hetero: '', //UNLISTED
    // integrator_function: '', //UNLISTED
    // initial_value: '', //UNLISTED
    // noise: '', //UNLISTED
    // integration_rate: '', //UNLISTED
    // integrator_mode: '', //UNLISTED
    // clip: '', //UNLISTED
    // enable_learning: '', //UNLISTED
    // learning_rate: '', //UNLISTED
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
    // integrator_function: '' ,//UNLISTED
    // initial_value: '' ,//UNLISTED
    // noise: '' ,//UNLISTED
    // integration_rate: '' ,//UNLISTED
    // integrator_mode: '' ,//UNLISTED
    // clip: '' ,//UNLISTED
    // additional_output_ports: '' ,//UNLISTED
  },
  [PNLMechanisms.KWTA_MECH]: {
    k_value: '', //number, float
    threshold: '', //number, float
    ratio: '', //number, float
    average_based: false, //bool
    inhibition_only: true, //bool
    function: '', //function
    matrix: '', //matrix
    // auto: '', //UNLISTED
    // hetero: '', //UNLISTED
    // integrator_function: '', //UNLISTED
    // initial_value: '', //UNLISTED
    // noise: '', //UNLISTED
    // integration_rate: '', //UNLISTED
    // integrator_mode: '', //UNLISTED
    // clip: '', //UNLISTED
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
    // noise: '', //UNLISTED
    // clip: '', //UNLISTED
    // integration_rate: '', //UNLISTED
  },
};
