import dodoActionTypes from './Dodo.types';

export const toggleDodo = (dodo) => ({
  type: dodoActionTypes.TOGGLE_DODO,
  payload : dodo
});
