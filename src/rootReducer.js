import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import { appReducer as app } from './components/App/AppReducer';
import { currencyConvertorReducer as currencyConvertor } from './components/CurrencyConvertor/CurrencyConvertorReducer';
export const rootReducer = combineReducers({
  app,
  currencyConvertor,
  routing: routerReducer,
});
