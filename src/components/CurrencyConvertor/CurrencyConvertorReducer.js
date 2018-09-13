import {
  SET_FIELD,
} from './CurrencyConvertorActions';

const initialState = {
  firstCurrency: '',
  secondCurrency: '',
  firstValue: '',
  secondValue: '',
  lastChanged: '',
  source: '',
};

export const currencyConvertorReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FIELD:
      const input = action.payload;
      return {
        ...state,
        [input.name]: input.value,
        lastChanged: input.name,
        source: input.source,
      };

    default:
      return state
  }
}

