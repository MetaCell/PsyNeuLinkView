import all from "./reducers/all";
import baseLayout from "../layout/defaultLayout";
import componentMap from "../layout/componentsMap";
import pnlMiddleware from "./middleware/pnlmiddleware";
import { GENERAL_DEFAULT_STATE } from "./reducers/general";
import { createStore } from '@metacell/geppetto-meta-client/common';
// import _ from 'lodash';
// import { configureStore } from '@reduxjs/toolkit'
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
