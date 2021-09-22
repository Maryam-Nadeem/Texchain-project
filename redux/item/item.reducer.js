import itemActionTypes from './item.types';

const INITIAL_STATE = {
  set:'',
  req_idd:'',

  mreqid:'',
  
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case itemActionTypes.TOGGLE_ITEM_HIDDEN:
      return {
        ...state,
       
        req_idd:action.payload,
        
      };
      case itemActionTypes.GET_REQ_ID:
      return {
        ...state,
       
        mreqid:action.payload,
        
      };
      

      case itemActionTypes.TOGGLE_SET:
      return {
        ...state,
        
        set:action.payload,
      };
    
    
    default:
      return state;
  }
};

export default itemReducer;