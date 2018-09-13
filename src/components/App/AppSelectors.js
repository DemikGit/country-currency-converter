import * as get from 'lodash.get';

export const getUserGeoData = (state) => {
  return get(state, ['app', 'user', 'location'], {});
};

export const getUserBaseCurrency = (state) => {
  return get(state, ['app', 'user', 'baseCurrency'], '');
}

export const getAvailableSymbolsOptions = (state) => {
  const currencies = get(state, ['app', 'currencies', 'symbols'], {});

  return Object.keys(currencies).map(function(key, index) {
    return {
      value: key, label: currencies[key]
    };
  });
}

export const getAvailableSymbols = (state) => {
  return get(state, ['app', 'currencies', 'symbols'], {});
}

export const getFavoriteCurrencies = (state) => {
  return get(state, ['app', 'user', 'favorites'], {});
}
