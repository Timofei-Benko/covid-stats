import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import loadCountryData from './apiService';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TS4023: Exported variable 'store' has or is using name '$CombinedState' from external module
// "<path_to_project_directory>/covid-stats/node_modules/redux/index" but cannot be named.
// ---
// cannot be ignored but nothing breaks because of it so idk
// TODO: figure out this $CombinedState TS error
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

store.dispatch(loadCountryData());

export type TRootState = ReturnType<typeof store.getState>;

export default store;
