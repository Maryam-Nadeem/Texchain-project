import dispatchActionTypes from './Dispatch.types';

export const toggleDispatch = (dispatch) => ({
  type: dispatchActionTypes.TOGGLE_DISPATCH,
  payload:dispatch
});
