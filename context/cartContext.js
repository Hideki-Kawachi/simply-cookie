import React from "react";

export const cart = {
	cookie: [
		{
			name: "",
			setName: () => {},
			price: 0,
			setPrice: () => {},
			qty: 0,
			setQty: () => {},
		},
	],
};

const CartContext = React.createContext(cart);
export default CartContext;
