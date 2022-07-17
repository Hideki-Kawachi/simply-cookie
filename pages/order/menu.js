import React from "react";
import Cart from "../../components/cart";
import Navbar from "../../components/navbar";
import OrderItem from "../../components/orderItem";
import CartContext from "../../context/cartContext";
import connectToDB from "../../db";
import Cookie from "../../mongoModels/cookieSchema";

export async function getServerSideProps() {
	await connectToDB();

	const temp = await Cookie.find();
	const cookies = JSON.stringify(temp);
	return { props: { cookies } };
}

function Menu({ cookies }) {
	return (
		<>
			<div
				id="header"
				className="h-[13vh] w-[100vw] flex flex-col justify-center"
			>
				<div className="relative top-[50%] text-center">
					<span id="header-text">ORDER</span>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area">
				{JSON.parse(cookies).map((cookie) => (
					<OrderItem
						key={cookie.name}
						pic={cookie.pic}
						name={cookie.name}
						price={cookie.price}
						qty={cookie.qty}
						description={cookie.description}
					></OrderItem>
				))}
			</div>
			<Cart></Cart>
		</>
	);
}

export default Menu;
