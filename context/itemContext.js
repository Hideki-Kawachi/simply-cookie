import React from "react";

export const item = {
	item: { name: "", price: 0, qty: 0, description: "", pic: "" },
	setItem: () => ({}),
};

const ItemContext = React.createContext(item);
export default ItemContext;
