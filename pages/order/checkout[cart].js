import React, { useEffect, useState } from "react";
import CheckoutItem from "../../components/checkoutItem";
import Navbar from "../../components/navbar";
import connectToDB from "../../db";
import Cookie from "../../mongoModels/cookieSchema";

export async function getServerSideProps(context) {
	await connectToDB();
	const cart = JSON.parse(context.query.cart);

	let temp = await findCookies(cart);

	let cookies = JSON.stringify(temp);
	return { props: { cart: context.query.cart, cookies: cookies } };
}

async function findCookies(cart) {
	let temp = [];
	cart.forEach((item) => {
		temp.push(Cookie.findOne({ name: item.name }, "name price pic").exec());
	});

	let final = await Promise.all(temp);
	return final;
}

function Checkout({ cart, cookies }) {
	const cookieJSON = JSON.parse(cookies);
	const cartJSON = JSON.parse(cart);
	const finalCart = [];
	const [total, setTotal] = useState(0);

	cookieJSON.forEach((cookie) => {
		let cartItem = cartJSON.find((item) => {
			return item.name == cookie.name;
		});
		if (cartItem != undefined) {
			finalCart.push({
				name: cookie.name,
				price: cookie.price,
				qty: cartItem.qty,
				pic: cookie.pic,
			});
		}
	});

	useEffect(() => {
		let tempTotal = 0;
		finalCart.forEach((item) => {
			tempTotal += item.qty * item.price;
		});
		setTotal(tempTotal);
	}, []);
	//console.log("final cart is:" + JSON.stringify(finalCart));

	return (
		<>
			<div
				id="header"
				className="h-[13vh] w-[100vw] flex flex-col justify-center"
			>
				<div className="relative top-[50%] text-center">
					<span id="header-text">CHECKOUT</span>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area">
				{finalCart.map((item) => (
					<CheckoutItem
						key={item.name}
						name={item.name}
						price={item.price}
						qty={item.qty}
						pic={item.pic}
					></CheckoutItem>
				))}
				<hr className="checkout-line"></hr>
				<span className="checkout-total">Total: Php {total}</span>
			</div>
		</>
	);
}

export default Checkout;
