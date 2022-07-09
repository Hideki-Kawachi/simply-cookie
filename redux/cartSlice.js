import { createSlice } from "@reduxjs/toolkit";

//sessionStorage.getItem("cart");
const initialState = 0;

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        edit: (state)=>{
            //state = {...state, actions.payload}
        }
    }
})

export const { edit } = cartSlice.actions;

export default cartSlice