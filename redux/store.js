import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import cart from './cartSlice'

const combinedReducers = combineReducers({
    cart
});

export const makeStore = () => configureStore({
    reducer: combinedReducers
})

export const wrapper = createWrapper(makeStore);
