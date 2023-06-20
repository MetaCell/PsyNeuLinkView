import * as Actions from '../actions/general';
import { GUIViews, modelState, updateStates } from '../../../constants';
const appStates = require('../../../nodeConstants').appStates;

const isFrontendDev = process.env.REACT_APP_FRONTEND_DEV === 'true';

export const GENERAL_DEFAULT_STATE = {
  model: undefined,
  error: undefined,
  mechanismCount: 0,
  selected: undefined,
  guiView: GUIViews.EDIT,
  compositionOpened: undefined,
  appState: appStates.APP_STARTED,
  modelState: modelState.MODEL_EMPTY,
  updateState: updateStates.UPDATE_DONE,
  dependenciesFound: true,
  condaEnvSelection: false,
  showRunModalDialog: false,
  spinnerEnabled: !isFrontendDev,
  inputData: {
    type: undefined,
    data: "",
  }
};


function generalReducer(state = GENERAL_DEFAULT_STATE, action) {
  switch (action.type) {
    case Actions.OPEN_FILE: {
      // TODO: to be implemented
      return { ...state };
    }
    case Actions.LOAD_MODEL: {
      return {
        ...state,
        model: action.data,
        modelState: modelState.MODEL_LOADED,
      };
    }
    case Actions.SAVE_MODEL: {
      // TODO: to be implemented
      return { ...state };
    }
    case Actions.UPDATE_MODEL: {
      return {
        ...state,
        updateState: updateStates.UPDATE_IN_PROGRESS,
      };
    }
    case Actions.MODEL_UPDATED: {
      return {
        ...state,
        updateState: updateStates.UPDATE_DONE,
      };
    }
    case Actions.SIMULATE_MODEL: {
      // TODO: to be implemented
      return { ...state };
    }
    case Actions.CHANGE_VIEW: {
      return {
        ...state,
        guiView: action.data,
      };
    }
    case Actions.SELECT: {
      return {
        ...state,
        selected: action.data,
      };
    }
    case Actions.OPEN_COMPOSITION: {
      return {
        ...state,
        compositionOpened: action.data,
      };
    }
    case Actions.CLOSE_COMPOSITION: {
      return {
        ...state,
        compositionOpened: undefined,
        selected: undefined,
      };
    }
    case Actions.INCREMENT_MECHANISM_COUNT: {
      return {
        ...state,
        mechanismCount: state.mechanismCount + 1,
      };
    }
    case Actions.SET_DEPENDENCIES_FOUND: {
      return {
        ...state,
        dependenciesFound: action.data,
      };
    }
    case Actions.SET_CONDA_ENV_SELECTION: {
      return {
        ...state,
        condaEnvSelection: action.data,
      };
    }
    case Actions.SET_SHOW_RUN_MODAL_DIALOG: {
      return {
        ...state,
        showRunModalDialog: action.data,
      };
    }
    case Actions.SET_SPINNER: {
      return {
        ...state,
        spinnerEnabled: action.data,
      };
    }
    case Actions.SET_CONDA_ENV: {
      return {
        ...state,
        condaEnv: action.data,
      };
    }
    case Actions.SET_INPUT_DATA: {
      return {
        ...state,
        inputData: action.data,
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default generalReducer;
