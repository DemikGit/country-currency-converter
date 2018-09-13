import * as get from 'lodash.get';

export const getRates = (state) => {
  return get(state, ['currencyList', 'rates'], {});
};
