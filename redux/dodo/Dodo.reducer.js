import dodoActionTypes from './Dodo.types';

const INITIAL_STATE = {
  dodo:[]
};

const dodoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {  
      case dodoActionTypes.TOGGLE_DODO:
        return {
          ...state,
          dodo:action.payload,
        };

    default:
      return state;
  }
};

export default dodoReducer;