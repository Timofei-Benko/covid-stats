import { applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

import covidStatsByCountryReducer from './reducers/covidStatsByCountry';
import loadCountryData from "./apiService";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    covidStatsByCountryReducer,
    composeEnhancer(applyMiddleware(thunk)),
);

store.dispatch(loadCountryData())

export default store;
