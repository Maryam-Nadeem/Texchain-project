  
import { createSelector } from 'reselect';

const selectdodo = state => state.Do;

export const selectdodo = createSelector(
  [selectdodo],
  Do => Do.dodo
);


