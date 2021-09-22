import ItemActionTypes from './item.types';

export const toggleCartHidden = (item) => ({
  type: ItemActionTypes.TOGGLE_ITEM_HIDDEN,
  payload:item
});


export const getReq = (item) => ({
  type: ItemActionTypes.GET_REQ_ID,
  payload:item
  
});
export const toggleSET = () => ({
  type: ItemActionTypes.SET,
  
});