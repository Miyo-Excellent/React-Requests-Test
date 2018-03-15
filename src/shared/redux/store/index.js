// Dependencies
import { createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Root Reducer
import rootReducer from '../rootReducer';

import configureStoreDevelopment from './configureStoreDevelopment';
import configureStoreProduction from './configureStoreProduction';

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

export default function configureStore(initialState = {}) {

  // Middlewares
  const middleware = [
    thunk,
    logger
  ];

  if (isDevelopment) {
    return createStore(
      rootReducer(),
      initialState,
      configureStoreDevelopment(middleware)
    );
  } else {
    return createStore(
      rootReducer(),
      initialState,
      configureStoreProduction(middleware)
    );
  }
}
