import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Correct for React 18
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import * as serviceWorker from './serviceWorker';

import rootReducer from './store/reducers/rootReducer';
import App from './App';

import './index.css';

const composeEnhancers = (
  (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose
);
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const root = ReactDOM.createRoot(document.getElementById('root')); // ✅ create root first

root.render( // ✅ then call render on it
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

serviceWorker.unregister();
