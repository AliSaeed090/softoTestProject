import ProductsReducer from './slices/ProductSlice';
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    Products: ProductsReducer,
   
});