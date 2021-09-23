  
import { createSelector } from 'reselect';

const selectdispatch = state => state.Dis;

export const selectdispatch = createSelector(
  [selectdispatch],
  Dis => Dis.dispatch
);


