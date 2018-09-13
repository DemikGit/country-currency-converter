import * as get from 'lodash.get';

export const getFirstCurrency = (state) => {
  return get(state, ['currencyConvertor', 'firstCurrency'], '');
};

export const getSecondCurrency = (state) => {
  return get(state, ['currencyConvertor', 'secondCurrency'], '');
};

export const getFirstValue = (state) => {
  return get(state, ['currencyConvertor', 'firstValue'], '');
};

export const getSecondValue = (state) => {
  return get(state, ['currencyConvertor', 'secondValue'], '');
};

export const getLastChanged = (state) => {
  return get(state, ['currencyConvertor', 'lastChanged'], '');
};

export const getSource = (state) => {
  return get(state, ['currencyConvertor', 'source'], '');
};


