  
import { createSelector } from 'reselect';

const selectsds = state => state.Supdev;

export const selectsds = createSelector(
  [selectsds],
  Supdev => Supdev.sds
);


