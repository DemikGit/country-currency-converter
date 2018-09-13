import { resolve, reject } from 'redux-simple-promise';
import { LOAD_ALL_RATES } from './CurrencyListActions';

const initialState = {
  rates: {
    data: [],
    loading: { isLoading: false, success: false },
  },
};

export const currencyListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_RATES:
      return {
        ...state,
        rates: {
          ...state.rates,
          data: [],
          loading: { isLoading: true, success: false },
        }
      };

    case resolve(LOAD_ALL_RATES):
      return {
        ...state,
        rates: {
          ...state.rates,
          data: Object.keys(action.payload.rates).map( key => {
            return { key: key, value: action.payload.rates[key] };
          }),
          loading: { isLoading: false, success: true },
        }
      };

    case reject(LOAD_ALL_RATES):
      return {
        ...state,
        rates: {
          ...state.rates,
          data: [],
          loading: { isLoading: false, success: false },
        }
      };

    default:
      return state
  }
}

