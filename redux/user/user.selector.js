  
import { createSelector } from 'reselect';

const selectuser = state => state.user;

export const selectuser = createSelector(
  [selectuser],
  user => user.user_id
);


