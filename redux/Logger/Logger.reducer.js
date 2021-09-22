import loggerActionTypes from './Logger.types';


const INITIAL_STATE = {
  SLogger:[],
  loading:false,
  dispatch:[],
  dodo:[],
  baorder:[],
  sds:[]

};

const loggerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loggerActionTypes.SCAN_LOGGER:
      return {
        ...state,
       
        SLogger:action.payload,
        
      };
      case loggerActionTypes.TOGGLE_LOADING:
      return {
        ...state,
        
        loading:!state.loading
      };
      case loggerActionTypes.TOGGLE_DISPATCH:
        return {
          ...state,
          
          dispatch:action.payload,
        };
      case loggerActionTypes.TOGGLE_DODO:
        return {
           ...state,
            
            dodo:action.payload,
        };
        case loggerActionTypes.TOGGLE_BAORDER:
        return {
           ...state,
            
            baorder:action.payload,
        };
        case loggerActionTypes.TOGGLE_SDS:
          return {
             ...state,
              
              sds:action.payload,
          };
    default:
      return state;
  }
};

export default loggerReducer;