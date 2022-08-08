import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Cart from "../../components/cart";
import Navbar from "../../components/navbar";
import OrderItem from "../../components/orderItem";
import connectToDB from "../../db";
import Cookie from "../../mongoModels/cookieSchema";

export async function getServerSideProps() {
	await connectToDB();

	const temp = await Cookie.find();
	const cookies = JSON.stringify(temp);
	return { props: { cookies } };
}

function Menu({ cookies }) {
	const [quantity, setQuantity] = useState();
	let sessionCookies;

	useEffect(() => {
		if (sessionStorage.getItem("cart") != null) {
			let tempCart = JSON.parse(sessionStorage.getItem("cart"));
			if (tempCart[0].name == "") {
				setQuantity(0);
			} else {
				let tempQuantity = 0;
				tempCart.map((cookie) => {
					tempQuantity += cookie.qty;
				});
				setQuantity(tempQuantity);
			}
		}
	}, []);

	const mainVariants = {
		initial: {
			opacity: 1,
		},
		animate: {
			opacity: 1,
			transition: {
				ease: "easeInOut",
				staggerChildren: 0.4,
			},
		},
	};

	return (
		<>
			<div id="header">
				<div className="background">
					<div className="relative top-[50%] text-center">
						<span id="header-text">ORDER</span>
					</div>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area">
				<AnimatePresence>
					<motion.div
						className="menu-main-card-container"
						variants={mainVariants}
						initial="initial"
						animate="animate"
					>
						{JSON.parse(cookies).map((cookie) => (
							<OrderItem
								key={cookie.name}
								pic={cookie.pic}
								name={cookie.name}
								quantity={quantity}
								description={cookie.description}
							></OrderItem>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
			<Cart quantity={quantity}></Cart>
		</>
	);
}

export default Menu;
