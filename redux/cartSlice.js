import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        quantity: 0
    },
    reducers: {
        increment: (state)=>{
            state.quantity += 1;
        },
        decrement: (state)=>{
            state.quantity -= 1;
        },
        addItem: (state, action)=>{
            console.log("action");
        }
    }
})

export const {increment,decrement,addItem} = cartSlice.actions;

export default cartSlice.reducer;