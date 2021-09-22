  
import { createSelector } from 'reselect';

const selectlogger = state => state.Logger;

export const selectlogger = createSelector(
  [selectlogger],
  Logger => Logger.SLogger
);


