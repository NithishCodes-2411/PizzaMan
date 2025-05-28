import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Ensure redux-thunk is installed
import authReducer from './store/reducers/auth'; // Example reducer
import cartReducer from './store/reducers/cart'; // Example reducer

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // Add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;