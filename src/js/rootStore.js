import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

const tempReducer = () => {
  null;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootStore = createStore(
  tempReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware(), thunk))  
);

export default rootStore;
