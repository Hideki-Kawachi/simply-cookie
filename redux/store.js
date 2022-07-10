import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";

export default configureStore({
    reducer: {
        cart: cartSliceReducer
    }
});
