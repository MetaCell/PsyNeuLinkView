import { GUIViews, modelState } from '../../constants';
import * as Actions from '../actions/general';
import ModelSingleton from '../../model/ModelSingleton';

export const GENERAL_DEFAULT_STATE = {
  modelState: modelState.MODEL_EMPTY,
  error: undefined,
  selected: undefined,
  guiView: GUIViews.EDIT,
  compositionOpened: undefined
}

// const reducer = ( state = GENERAL_DEFAULT_STATE, action ) => ({
//   ...state,
//   ...generalReducer(state, action)
// });

function generalReducer (state = GENERAL_DEFAULT_STATE, action) {
  switch (action.type) {
    case Actions.OPEN_FILE: {
      // TODO: to be implemented
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
      // TODO: to be implemented
      return {...state};
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
        composition_opened: action.data,
      };
    }
    case Actions.CLOSE_COMPOSITION: {
      return {
        ...state,
        composition_opened: undefined,
      };
    }
    default: {
      return {...state};
    }
  }
}


export default generalReducer;