import { fetchAllRates } from '../../services/CurrencyService';

export const LOAD_ALL_RATES = 'LOAD_ALL_RATES';

export const loadAllRates = () => {
  return {
    type: LOAD_ALL_RATES,
    payload: {
      promise: fetchAllRates(),
    }
  };
};
