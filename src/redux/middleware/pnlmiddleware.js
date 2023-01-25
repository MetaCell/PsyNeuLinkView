import {
  LOAD_MODEL,
  UPDATE_MODEL
} from "../actions/general";
import { modelUpdated } from "../actions/general";
import ModelSingleton from "../../model/ModelSingleton";

const pnlMiddleware = store => next => action => {
  let performUpdate = true;
  switch (action.type) {
    case LOAD_MODEL: {
      ModelSingleton.initInstance(action.data);
      break;
    }
    case UPDATE_MODEL: {
      performUpdate = false;
      next(action);
      next(modelUpdated());
      break;
    }
    default: {
      break;
    }
  }

  if (performUpdate) {
    next(action);
  }
}

export default pnlMiddleware;