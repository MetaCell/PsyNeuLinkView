import {
  CLOSE_COMPOSITION,
  LOAD_MODEL, OPEN_COMPOSITION,
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
    case OPEN_COMPOSITION: {
      const model = ModelSingleton.getInstance();
      const graph = model.getMetaGraph().findNode(action.data);
      model.takePositionsSnapshot(graph)
      break;
    }

    case CLOSE_COMPOSITION: {
      const model = ModelSingleton.getInstance();
      const graph = model.getMetaGraph().findNode(action.data);
      model.restorePositionsSnapshot(graph)
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