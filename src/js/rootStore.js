import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import throttle from 'lodash/throttle';
import { loadState, saveState } from './sessionStorage';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootStore = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(promiseMiddleware(), thunk))
);

rootStore.subscribe(throttle(() => {
  saveState(rootStore.getState());
}),1000)


export default rootStore;
