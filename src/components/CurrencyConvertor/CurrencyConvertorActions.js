export const SET_FIELD = 'SET_FIELD';

export const setField = (name, value, source) => {
  return {
    type: SET_FIELD,
    payload: {
      name,
      value,
      source
    }
  };
};

