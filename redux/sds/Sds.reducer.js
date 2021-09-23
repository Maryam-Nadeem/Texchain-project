import sdsActionTypes from './Sds.types';

const INITIAL_STATE = {
  sds:[]
};

const sdsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {  
      case sdsActionTypes.TOGGLE_SDS:
        return {
          ...state,
          sds:action.payload,
        };

    default:
      return state;
  }
};

export default sdsReducer;