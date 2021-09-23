import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import itemReducer from './item/item.reducer';
import userReducer from './user/user.reducer';
import loggerReducer from './Logger/Logger.reducer';
import dispatchReducer from './dispatch/Dispatch.reducer';
import dodoReducer from './dodo/Dodo.reducer';
import sdsReducer from './sds/Sds.reducer';
import baorderReducer from './baorder/Baorder.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['item','Logger','user','Supdev','Dis','Do','Order']
};

const rootReducer = combineReducers({
  
  item: itemReducer,
  user: userReducer,
  Logger:loggerReducer,
  Dis:dispatchReducer,
  Do:dodoReducer,
  Order:baorderReducer,
  Supdev:sdsReducer
  
});

export default persistReducer(persistConfig, rootReducer);