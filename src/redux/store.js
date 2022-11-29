import _ from 'lodash';
import logger from 'redux-logger';
import reducer from "./reducers/general";
import { configureStore } from '@reduxjs/toolkit'
import pnlMiddleware from "./middleware/pnlmiddleware";
import { GENERAL_DEFAULT_STATE } from "./reducers/general";
// And use redux-batched-subscribe as an example of adding enhancers
import { batchedSubscribe } from 'redux-batched-subscribe';


const INIT_STATE = { generals: GENERAL_DEFAULT_STATE };
const debounceNotify = _.debounce(notify => notify());

function initStore (state = INIT_STATE) {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pnlMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    state,
    enhancers: [batchedSubscribe(debounceNotify)],
  });
}

const pnlStore = initStore(INIT_STATE);

export default pnlStore;