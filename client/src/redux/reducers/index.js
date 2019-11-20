import { combineReducers } from 'redux';
import amortiguadoresReducers from './amortiguadoresReducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const amortiPersistConfig = {
    key: 'amorti',
    storage: storage,
    whitelist: ['']
  };


export default combineReducers({
    amortiguadoresReducers: persistReducer(amortiPersistConfig,amortiguadoresReducers)
})