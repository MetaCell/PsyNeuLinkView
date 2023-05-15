// import _ from 'lodash';
import all from "./reducers/all";
// import { configureStore } from '@reduxjs/toolkit'
import pnlMiddleware from "./middleware/pnlmiddleware";
import { GENERAL_DEFAULT_STATE } from "./reducers/general";
import { createStore } from '@metacell/geppetto-meta-client/common';
import componentMap from "../layout/componentsMap";
import baseLayout from "../layout/defaultLayout";
// And use redux-batched-subscribe as an example of adding enhancers
// import { batchedSubscribe } from 'redux-batched-subscribe';


const INIT_STATE = {
  general: GENERAL_DEFAULT_STATE
};

// const debounceNotify = _.debounce(notify => notify());
// function initStore (state = INIT_STATE) {
//   return configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pnlMiddleware),
//     devTools: process.env.NODE_ENV !== 'production',
//     state,
//     // enhancers: [batchedSubscribe(debounceNotify)],
//   });
// }

// const pnlStore = initStore(INIT_STATE);

const pnlStore = createStore(
  all,
  INIT_STATE,
  [pnlMiddleware],
  { baseLayout, componentMap },
);

export default pnlStore;
