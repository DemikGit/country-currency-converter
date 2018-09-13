import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import { appReducer as app } from './components/App/AppReducer';
export const rootReducer = combineReducers({
  app,
  routing: routerReducer,
});
