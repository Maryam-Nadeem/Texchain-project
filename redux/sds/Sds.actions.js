import sdsActionTypes from './Sds.types';

export const toggleSds = (sds) => ({
  type: sdsActionTypes.TOGGLE_SDS,
  payload : sds
});
