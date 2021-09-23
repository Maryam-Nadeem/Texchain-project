import dispatchActionTypes from './Dispatch.types';

const INITIAL_STATE = {
 
  dispatch:[]
};

const dispatchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {  
      case dispatchActionTypes.TOGGLE_DISPATCH:
        return {
          ...state,
          
          dispatch:action.payload,
        };

    default:
      return state;
  }
};

export default dispatchReducer;