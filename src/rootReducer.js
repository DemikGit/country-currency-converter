import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import { appReducer as app } from './components/App/AppReducer';
import { currencyListReducer as currencyList } from './components/CurrencyList/CurrencyListReducer';
import { currencyConvertorReducer as currencyConvertor } from './components/CurrencyConvertor/CurrencyConvertorReducer';

export const rootReducer = combineReducers({
  app,
  currencyList,
  currencyConvertor,
  routing: routerReducer,
});
