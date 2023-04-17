import * as Actions from '../actions/general';
import { GUIViews, modelState, updateStates } from '../../../constants';
const appStates = require('../../../nodeConstants').appStates;

export const GENERAL_DEFAULT_STATE = {
  appState: appStates.APP_STARTED,
  compositionOpened: undefined,
  error: undefined,
  guiView: GUIViews.EDIT,
  modelState: modelState.MODEL_EMPTY,
  selected: undefined,
  updateState: updateStates.UPDATE_DONE,
}

// const reducer = ( state = GENERAL_DEFAULT_STATE, action ) => ({
//   ...state,
//   ...generalReducer(state, action)
// });

function generalReducer (state = GENERAL_DEFAULT_STATE, action) {
  switch (action.type) {
    case Actions.OPEN_FILE: {
      // TODO: to be implemented
      console.log('redux: open file');
      console.log(action.data);
      return {...state};
    }
    case Actions.LOAD_MODEL: {
      return {
        ...state,
        modelState: modelState.MODEL_LOADED,
      }
    }
    case Actions.SAVE_MODEL: {
      // TODO: to be implemented
      return {...state};
    }
    case Actions.UPDATE_MODEL: {
      return {
        ...state,
        updateState: updateStates.UPDATE_IN_PROGRESS,
      }
    }
    case Actions.MODEL_UPDATED: {
      return {
        ...state,
        updateState: updateStates.UPDATE_DONE,
      }
    }
    case Actions.SIMULATE_MODEL: {
      // TODO: to be implemented
      return {...state};
    }
    case Actions.CHANGE_VIEW: {
      return {
        ...state,
        guiView: action.data
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
    case Actions.CHANGE_APP_STATE: {
      return {
        ...state,
        appState: action.data,
      };
    }
    default: {
      return {...state};
    }
  }
}


export default generalReducer;