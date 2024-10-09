import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice';
import bookReducer from '../slice/bookSlice';
import cartReducer from '../slice/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  cart: cartReducer
});

export default rootReducer;