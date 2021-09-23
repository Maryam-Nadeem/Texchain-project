import baorderActionTypes from './Baorder.types';

export const toggleBaorder = (baorder) => ({
  type: baorderActionTypes.TOGGLE_BAORDER,
  payload:baorder
});
