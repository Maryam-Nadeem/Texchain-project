import userActionTypes from './user.types';

export const userLogin = (user_id) => ({
  type: userActionTypes.USER_LOGIN,
  payload:user_id
});

