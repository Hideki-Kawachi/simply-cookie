import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import connectToDB from "../../db";
import Cookie from "../../mongoModels/cookieSchema";
import Image from "next/image";
import Cart from "../../components/cart";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
	await connectToDB();
	let temp, cookie;
	temp = await Cookie.findOne({ name: context.query.item });
	cookie = JSON.stringify(temp);
	return { props: { cookie } };
}

function OrderSelect({ cookie }) {
	const [cookieQuantity, setCookieQuantity] = useState(0);
	const [currentCookie, setCurrentCookie] = useState(JSON.parse(cookie));
	const [quantity, setQuantity] = useState();

	const control = useAnimation();
	const router = useRouter();

	const buttonVariants = {
		clicked: {
			scale: 0.9,
			transition: {
				ease: "easeInOut",
				duration: 0.05,
			},
		},
	};

	function disableButton() {
		return cookieQuantity <= 0;
	}

	function updateQuantity(cart) {
		let tempQuantity = 0;
		cart.map((cookie) => {
			tempQuantity += cookie.qty;
		});
		setQuantity(tempQuantity);
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}

	useEffect(() => {
		if (sessionStorage.getItem("cart") != null) {
			let tempCart = JSON.parse(sessionStorage.getItem("cart"));
			updateQuantity(tempCart);
			if (tempCart[0].name != "") {
				let sessionCookie = tempCart.find((cookie, index) => {
					return cookie.name == currentCookie.name;
				});
				if (sessionCookie == undefined) {
					setCookieQuantity(0);
				} else {
					setCookieQuantity(sessionCookie.qty);
				}
			}
		}
	}, []);

	// For automatic changing of cart without pressing submit
	/*	
	useEffect(() => {
		//console.log("from changing qty: " + sessionStorage.getItem("cart"));
		if (sessionStorage.getItem("cart") != null) {
			let tempCart = JSON.parse(sessionStorage.getItem("cart"));
			if (cookieQuantity > 0) {
				if (tempCart[0].name != "") {
					let sessionCookie = tempCart.find((cookie, index) => {
						if (cookie.name == currentCookie.name) {
							tempCart[index] = {
								name: currentCookie.name,
								price: currentCookie.price,
								qty: cookieQuantity,
							};
							return true;
						}
					});

					if (sessionCookie == undefined) {
						tempCart.push({
							name: currentCookie.name,
							price: currentCookie.price,
							qty: cookieQuantity,
						});
					}
					updateQuantity(tempCart);
				} else {
					sessionStorage.setItem(
						"cart",
						JSON.stringify([
							{
								name: currentCookie.name,
								price: currentCookie.price,
								qty: cookieQuantity,
							},
						])
					);
					updateQuantity([
						{
							name: currentCookie.name,
							price: currentCookie.price,
							qty: cookieQuantity,
						},
					]);
				}
			}
		}
	}, [cookieQuantity]);
	*/

	function detectMinus() {
		if (cookieQuantity == 1) {
			let tempCart = JSON.parse(sessionStorage.getItem("cart"));
			let newCart = tempCart.filter((currCookie) => {
				return currCookie.name != currentCookie.name;
			});
			if (newCart.length == 0) {
				newCart[0] = { name: "", price: 0, qty: 0 };
			}
			updateQuantity(newCart);
			sessionStorage.setItem("cart", JSON.stringify(newCart));
		}
		setCookieQuantity(cookieQuantity - 1);
	}

	//redirect to menu when going back
	useEffect(() => {
		router.beforePopState(() => {
			router.push("/order/menu");
			return false;
		});
	}, []);

	function submitCart() {
		if (sessionStorage.getItem("cart") != null) {
			let tempCart = JSON.parse(sessionStorage.getItem("cart"));
			if (cookieQuantity > 0) {
				if (tempCart[0].name != "") {
					let sessionCookie = tempCart.find((cookie, index) => {
						if (cookie.name == currentCookie.name) {
							tempCart[index] = {
								name: currentCookie.name,
								price: currentCookie.price,
								qty: cookieQuantity,
							};
							return true;
						}
					});

					if (sessionCookie == undefined) {
						tempCart.push({
							name: currentCookie.name,
							price: currentCookie.price,
							qty: cookieQuantity,
						});
					}
					updateQuantity(tempCart);
				} else {
					sessionStorage.setItem(
						"cart",
						JSON.stringify([
							{
								name: currentCookie.name,
								price: currentCookie.price,
								qty: cookieQuantity,
							},
						])
					);
					updateQuantity([
						{
							name: currentCookie.name,
							price: currentCookie.price,
							qty: cookieQuantity,
						},
					]);
				}
			}
		}
		router.push("/order/menu");
	}

	const picVariant = {
		initial: {
			opacity: 0,
			x: "-100%",
		},
		animate: {
			opacity: 1,
			x: 0,
			transition: {
				ease: "easeOut",
				duration: 0.8,
			},
		},
	};

	const captionVariant = {
		initial: {
			opacity: 0,
			x: "100%",
		},
		animate: {
			opacity: 1,
			x: 0,
			transition: {
				ease: "easeOut",
				duration: 0.8,
			},
		},
	};

	const mainVariant = {
		initial: {
			opacity: 1,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemAddVariant = {
		initial: {
			y: -20,
			opacity: -0.5,
		},
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				ease: "easeOut",
				duration: 0.8,
			},
		},
	};

	return (
		<>
			<div id="header" className="flex flex-col justify-center">
				<div className="background"></div>
			</div>
			<Navbar></Navbar>
			<div id="content-area">
				<AnimatePresence>
					<motion.div
						variants={mainVariant}
						initial="initial"
						animate="animate"
						className="order-item-main-container"
					>
						<motion.div
							id="item-select"
							className="order-item-pic-container"
							variants={picVariant}
						>
							<Image
								alt={currentCookie.name}
								className="order-item-pic"
								src={currentCookie.pic}
								layout="responsive"
								width="100%"
								height="100%"
							></Image>
						</motion.div>
						<div className="order-item-side-container">
							<motion.div
								className="order-item-caption-container"
								variants={captionVariant}
							>
								<h1 className="order-item-name">{currentCookie.name}</h1>
								<span className="order-item-description-select">
									{currentCookie.description}
								</span>
							</motion.div>
							<motion.div
								className="order-item-add-container"
								variants={itemAddVariant}
							>
								<span className="order-item-qty">
									Php {currentCookie.price} / Box of {currentCookie.qty}
								</span>
								<div className="order-item-quantity-container">
									<motion.button
										disabled={disableButton()}
										whileTap="clicked"
										animate={control}
										variants={buttonVariants}
										onClick={() => detectMinus()}
									>
										<svg
											width="24"
											height="24"
											strokeWidth="2"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6 12H18"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</motion.button>
									<span>{cookieQuantity}</span>
									<motion.button
										whileTap="clicked"
										animate={control}
										variants={buttonVariants}
										onClick={() => setCookieQuantity(cookieQuantity + 1)}
									>
										<svg
											width="24"
											height="24"
											strokeWidth="2"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6 12H12M18 12H12M12 12V6M12 12V18"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</motion.button>
								</div>
							</motion.div>
							<motion.div
								variants={itemAddVariant}
								className="order-item-submit-container"
							>
								<motion.button
									whileTap="clicked"
									animate={control}
									variants={buttonVariants}
									onClick={() => submitCart()}
									className="order-item-submit-button"
								>
									Confirm
								</motion.button>
							</motion.div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
			<Cart quantity={quantity}></Cart>
		</>
	);
}

export default OrderSelect;
