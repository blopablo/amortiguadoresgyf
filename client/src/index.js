import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
//import 'bootstrap/dist/js/bootstrap.js';
ReactDOM.render(
    
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>

, document.getElementById('root'));

serviceWorker.unregister();
