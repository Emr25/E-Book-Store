import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from "./authSlice"
import productSlice from './productSlice';
import BasketSlice from "./BasketSlice"

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        product: productSlice,
        basket: BasketSlice
    }
});