import * as Actions from '../actions/general';
import { GUIViews, modelState, updateStates } from '../../../constants';
const appStates = require('../../../messageTypes').appStates;

export const GENERAL_DEFAULT_STATE = {
  appState: appStates.APP_STARTED,
  compositionOpened: undefined,
  error: undefined,
  guiView: GUIViews.EDIT,
<<<<<<< HEAD:src/client/redux/reducers/general.js
  modelState: modelState.MODEL_EMPTY,
  selected: undefined,
  updateState: updateStates.UPDATE_DONE,
}
=======
  compositionOpened: undefined,
  mechanismCount: 0,
};
>>>>>>> 0a9a7470537125a5bb0e0e9b5fe93e1236168b73:src/redux/reducers/general.js

// const reducer = ( state = GENERAL_DEFAULT_STATE, action ) => ({
//   ...state,
//   ...generalReducer(state, action)
// });

function generalReducer(state = GENERAL_DEFAULT_STATE, action) {
  switch (action.type) {
    case Actions.OPEN_FILE: {
      // TODO: to be implemented
<<<<<<< HEAD:src/client/redux/reducers/general.js
      console.log('redux: open file');
      console.log(action.data);
      return {...state};
=======
      return { ...state };
>>>>>>> 0a9a7470537125a5bb0e0e9b5fe93e1236168b73:src/redux/reducers/general.js
    }
    case Actions.LOAD_MODEL: {
      return {
        ...state,
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
      };
    }
    case Actions.INCREMENT_MECHANISM_COUNT: {
      return {
        ...state,
        mechanismCount: state.mechanismCount + 1,
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default generalReducer;
