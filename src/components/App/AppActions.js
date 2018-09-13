import { fetchGeoLocation } from '../../services/GeoService';
import { fetchSymbols } from '../../services/CurrencyService';

export const LOAD_USER_LOCATION = 'LOAD_USER_LOCATION';
export const LOAD_AVAILABLE_SYMBOLS = 'LOAD_AVAILABLE_SYMBOLS';
export const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
export const TOGGLE_FAVORITE_CURRENCY = 'SET_FAVORITE_CURRENCY';

export const loadUserLocation = () => {
  return {
    type: LOAD_USER_LOCATION,
    payload: {
      promise: fetchGeoLocation(),
    }
  };
};

export const loadAvailableSymbols = () => {
  return {
    type: LOAD_AVAILABLE_SYMBOLS,
    payload: {
      promise: fetchSymbols(),
    }
  };
};

export const setBaseCurrency = (symbol) => {
  return {
    type: SET_BASE_CURRENCY,
    payload: symbol
  };
}

export const toggleFavoriteCurrency = (symbol) => {
  return {
    type: TOGGLE_FAVORITE_CURRENCY,
    payload: symbol
  };
}

