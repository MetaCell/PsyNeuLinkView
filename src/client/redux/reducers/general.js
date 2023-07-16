import * as Actions from '../actions/general';
import { GUIViews, modelState, updateStates } from '../../../constants';
import { PNLLoggables, PNLDefaults } from '../../../constants';
import messageHandler from '../../grpc/messagesHandler';
import { messageTypes } from '../../../nodeConstants';
import ModelSingleton from '../../model/ModelSingleton';
const appStates = require('../../../nodeConstants').appStates;

const isFrontendDev = process.env.REACT_APP_FRONTEND_DEV === 'true';

export const GENERAL_DEFAULT_STATE = {
  model: undefined,
  modelKey: 0,
  errorTitle: undefined,
  errorMessage: undefined,
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
  showErrorDialog: false,
  spinnerEnabled: !isFrontendDev,
  executables: [],
  inputData: {
    type: undefined,
    data: "",
  },
  [PNLLoggables]: {},
  [PNLDefaults]: {},
};

window.api.receive("fromMain", (data) => {
  messageHandler(data, {
    [messageTypes.OPEN_FILE]: () => { console.log('open called from the reducer')},
    [messageTypes.FILE_UPDATED]: () => { console.log('file updated called from the reducer')},
    [messageTypes.PNL_FOUND]: () => { console.log('pnl found called from the reducer')},
    [messageTypes.PNL_NOT_FOUND]: () => { console.log('pnl not found called from the reducer')},
    [messageTypes.SERVER_STARTED]: () => { console.log('server started called from the reducer')},
  })
});


function generalReducer(state = GENERAL_DEFAULT_STATE, action) {
  switch (action.type) {
    case Actions.OPEN_FILE: {
      // TODO: to be implemented
      return { ...state };
    }
    case Actions.LOAD_MODEL: {
      const nodes = ModelSingleton.getInstance().getMetaGraph().getNodes();
      const compositions = [];
      const mechanisms= [];
      nodes.forEach(node => {
        if (node.getOption('type') === 'Composition') {
          compositions.push[node.getOption('name')] = `${node.getOption('name')}`;
        } else {
          mechanisms[node.getOption('name')] = `${node.getOption('name')}`;
        }
      });
      return {
        ...state,
        model: action.data,
        modelKey: state.modelKey + 1,
        modelState: modelState.MODEL_LOADED,
        executables: {...compositions, ...mechanisms},
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
    case Actions.SET_SHOW_ERROR_DIALOG: {
      return {
        ...state,
        showErrorDialog: action.data,
        errorTitle: action.title,
        errorMessage: action.message,
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
    case Actions.INIT_LOGGABLES_AND_DEFAULTS: {
      return {
        ...state,
        [PNLLoggables]: action.data[PNLLoggables],
        [PNLDefaults]: action.data[PNLDefaults],
      };
    }
    case Actions.ADD_NODE_TO_MODEL: {
      const nodes = ModelSingleton.getInstance().getMetaGraph().getNodes();
      const compositions = [];
      const mechanisms= [];
      nodes.forEach(node => {
        if (node.getOption('type') === 'Composition') {
          compositions.push[node.getOption('name')] = `${node.getOption('name')}`;
        } else {
          mechanisms[node.getOption('name')] = `${node.getOption('name')}`;
        }
      });
      return {
        ...state,
        modelKey: state.modelKey + 1,
        modelState: modelState.MODEL_LOADED,
        executables: {...compositions, ...mechanisms},
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default generalReducer;
