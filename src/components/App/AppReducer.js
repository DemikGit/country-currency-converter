import { resolve, reject } from 'redux-simple-promise';
import {
  LOAD_USER_LOCATION, LOAD_AVAILABLE_SYMBOLS,
  SET_BASE_CURRENCY, TOGGLE_FAVORITE_CURRENCY,
} from './AppActions';

const initialState = {
  user: {
    baseCurrency: '',
    location: {
      data: {},
      loading: { isLoading: false, success: false },
    },
    favorites: {},
  },
  currencies: {
    symbols: [],
    loading: { isLoading: false, success: false },
  },
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_LOCATION:
      return {
        ...state,
        user: {
          ...state.user,
          location: {
            data: {},
            loading: { isLoading: true, success: false },
          },
        }
      };
    case resolve(LOAD_USER_LOCATION):
      return {
        ...state,
        user: {
          ...state.user,
          location: {
            data: action.payload,
            loading: { isLoading: false, success: true },
          },
        }
      };
    case reject(LOAD_USER_LOCATION):
      return {
        ...state,
        user: {
          ...state.user,
          location: {
            data: {},
            loading: { isLoading: false, success: false },
          },
        }
      };

    case LOAD_AVAILABLE_SYMBOLS:
      return {
        ...state,
        currencies: {
          ...state.currencies,
          symbols: [],
          loading: { isLoading: true, success: false },
        },
      };

    case resolve(LOAD_AVAILABLE_SYMBOLS):
      return {
        ...state,
        currencies: {
          ...state.currencies,
          symbols: action.payload,
          loading: { isLoading: false, success: true },
        },
      };
    case reject(LOAD_AVAILABLE_SYMBOLS):
      return {
        ...state,
        currencies: {
          ...state.currencies,
          symbols: [],
          loading: { isLoading: false, success: false },
        },
      };

    case SET_BASE_CURRENCY:
      return {
        ...state,
        user: {
          ...state.user,
          baseCurrency: action.payload,
        }
      };

    case TOGGLE_FAVORITE_CURRENCY:
      const favorite = action.payload;
      let newFavorites = state.user.favorites;
      if (!!state.user.favorites[favorite]) {
        delete newFavorites[favorite]
      } else {
        newFavorites = {
          ...newFavorites,
          [favorite]: favorite,
        }
      }

      return {
        ...state,
        user: {
          ...state.user,
          favorites: newFavorites,
        }
      };

    default:
      return state
  }
}

