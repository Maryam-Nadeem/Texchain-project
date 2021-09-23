import baorderActionTypes from './Baorder.types';

const INITIAL_STATE = {
 
  baorder:[]
};

const baorderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {  
      case baorderActionTypes.TOGGLE_BAORDER:
        return {
          ...state,
          
          baorder:action.payload,
        };

    default:
      return state;
  }
};

export default baorderReducer;