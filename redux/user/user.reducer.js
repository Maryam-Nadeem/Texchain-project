import userActionTypes from './user.types';

const INITIAL_STATE = {
  user_id:''
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN:
      return {
        ...state,
       
        user_id:action.payload,
        
      };

    default:
      return state;
  }
};

export default userReducer;