import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware} from 'redux';
import {persistStore } from 'redux-persist/';

const store = createStore (
    reducers,
    {},
    applyMiddleware(reduxThunk)
)
const persistor = persistStore(store)
export {store, persistor};