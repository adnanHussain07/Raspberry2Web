import { combineReducers } from '@reduxjs/toolkit';
import products from './productsSlice';

const reducer = combineReducers({
  products,
});

export default reducer;
