import { LOAD_MODEL } from "../actions/general";
import ModelSingleton from "../../model/ModelSingleton";

const pnlMiddleware = store => next => action => {
  switch (action.type) {
    case LOAD_MODEL: {
      const modelSing = ModelSingleton.initInstance(action.data);
      break;
    }
    default: {
      break;
    }
  }
  next(action);
}

export default pnlMiddleware;