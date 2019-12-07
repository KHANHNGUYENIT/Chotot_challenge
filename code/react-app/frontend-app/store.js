import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';

const middlewares = [thunk, promiseMiddleware, logger];

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middlewares)
    )
  );
}