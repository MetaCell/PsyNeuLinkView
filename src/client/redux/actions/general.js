import { PNLLoggables, PNLDefaults } from "../../../constants";

export const OPEN_FILE = 'open_file';
export const LOAD_MODEL = 'load_model';
export const SAVE_MODEL = 'save_model';
export const UPDATE_MODEL = 'update_model';
export const MODEL_UPDATED = 'model_updated';
export const SIMULATE_MODEL = 'simulate_model';
export const CHANGE_VIEW = 'change_view';
export const SELECT = 'select';
export const OPEN_COMPOSITION = 'open_composition';
export const CLOSE_COMPOSITION = 'close_composition';
export const INCREMENT_MECHANISM_COUNT = 'increment_mechanism_count';
export const SET_DEPENDENCIES_FOUND = 'set_dependencies_found';
export const SET_CONDA_ENV_SELECTION = 'set_conda_env_selection';
export const SET_SHOW_RUN_MODAL_DIALOG = 'set_show_run_modal_dialog';
export const SET_SHOW_ERROR_DIALOG = 'set_show_error_dialog';
export const SET_SPINNER = 'set_spinner';
export const SET_CONDA_ENV = 'set_conda_env';
export const SET_INPUT_DATA = 'set_input_data';
export const INIT_LOGGABLES_AND_DEFAULTS = 'init_loggables_and_defaults';


export const openFile = (filePath) => ({
  type: OPEN_FILE,
  data: filePath,
});

export const loadModel = (modelData) => ({
  type: LOAD_MODEL,
  data: modelData,
});

export const saveModel = (filePath) => ({
  type: SAVE_MODEL,
  data: filePath,
});

export const updateModel = () => ({
  type: UPDATE_MODEL,
  data: undefined,
});

export const modelUpdated = () => ({
  type: MODEL_UPDATED,
  data: undefined,
});

export const simulateModel = (model) => ({
  type: SIMULATE_MODEL,
  data: model,
});

export const changeView = (newView) => ({
  type: CHANGE_VIEW,
  data: newView,
});

export const select = (node) => ({
  type: SELECT,
  data: node,
});

export const openComposition = (compositionNode) => ({
  type: OPEN_COMPOSITION,
  data: compositionNode,
});

export const closeComposition = (compositionNode) => ({
  type: CLOSE_COMPOSITION,
  data: compositionNode,
});

export const updateMechanismCount = () => ({
  type: INCREMENT_MECHANISM_COUNT,
  data: undefined,
});

export const setDependenciesFound = (dependenciesFound) => ({
  type: SET_DEPENDENCIES_FOUND,
  data: dependenciesFound,
});

export const setCondaEnvSelection = (condaEnvSelection) => ({
  type: SET_CONDA_ENV_SELECTION,
  data: condaEnvSelection,
});

export const setShowRunModalDialog = (showRunModalDialog) => ({
  type: SET_SHOW_RUN_MODAL_DIALOG,
  data: showRunModalDialog,
});


export const setShowErrorDialog = (showErrorDialog, title, message) => ({
  type: SET_SHOW_ERROR_DIALOG,
  data: showErrorDialog,
  title: title,
  message: message,
});


export const setSpinner = (spinnerEnabled) => ({
  type: SET_SPINNER,
  data: spinnerEnabled,
});

export const setCondaEnv = (condaEnv) => ({
  type: SET_CONDA_ENV,
  data: condaEnv,
});

export const setInputData = (inputData) => ({
  type: SET_INPUT_DATA,
  data: inputData,
});

export const initLoggablesAndDefaults = (loggables, defaults) => ({
  type: INIT_LOGGABLES_AND_DEFAULTS,
  data: {
    [PNLLoggables]: loggables,
    [PNLDefaults]: defaults,
  },
});
