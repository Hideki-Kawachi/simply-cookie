import React from "react";
import connectToDB from "../../db";
import Cookie from "../../mongoModels/cookieSchema";

export async function getServerSideProps(context) {
	await connectToDB();
	const cart = JSON.parse(context.query.cart);
	let temp = [];
	let cookies = "";
	console.log("cart is: " + JSON.stringify(cart));

	cart.map(async (item) => {
		console.log("item name is:" + item.name);
		let result = await Cookie.findOne({ name: item.name });
		if (result !== null && result !== undefined) {
			temp.push(result);
			console.log("cookies " + temp);
		}
	});

	cookies = JSON.stringify(temp);

	return {
		props: { cart: context.query.cart, cookies: cookies },
	};
}

function Checkout({ cart, cookies }) {
	console.log("checkout: " + cookies + "--" + cart);
	return (
		<>
			<span>Checkout</span>
		</>
	);
}

export default Checkout;
