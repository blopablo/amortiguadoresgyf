import { combineReducers } from 'redux';
import amortiguadoresReducers from './amortiguadoresReducers';
import carroReducers from './carroReducers';
import loginReducers from './loginReducers';
import billReducers from './billReducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const amortiPersistConfig = {
    key: 'amorti',
    storage: storage,
    whitelist: ['']
  };
  const cartPersistConfig = {
    key: 'cart',
    storage: storage,
    whitelist: ['cart','total','cantidad_cart']
  };
  const loginPersisConfig = {
    key:'log',
    storage:storage,
    whitelist:['usuario']
  }

  const billPersistConfig = {
    key:'bill',
    storage: storage,
    whitelist:['']
  }

export default combineReducers({
    carroReducers: persistReducer(cartPersistConfig,carroReducers),
    amortiguadoresReducers: persistReducer(amortiPersistConfig,amortiguadoresReducers),
    loginReducers: persistReducer(loginPersisConfig, loginReducers),
    billReducers: persistReducer(billPersistConfig, billReducers)
})