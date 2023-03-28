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

export const openComposition = (compositionId) => ({
  type: OPEN_COMPOSITION,
  data: compositionId,
});

export const closeComposition = () => ({
  type: OPEN_FILE,
  data: undefined,
});
export const updateMechanismCount = () => ({
  type: INCREMENT_MECHANISM_COUNT,
  data: undefined,
});
