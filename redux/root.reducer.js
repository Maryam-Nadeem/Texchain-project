import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import itemReducer from './item/item.reducer';
import userReducer from './user/user.reducer';
import loggerReducer from './Logger/Logger.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['item','Logger','user']
};

const rootReducer = combineReducers({
  
  item: itemReducer,
  user: userReducer,
  Logger:loggerReducer
  
});

export default persistReducer(persistConfig, rootReducer);