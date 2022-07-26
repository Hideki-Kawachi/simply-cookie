import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

function CheckoutCartItem({ name, pic, qty, price }) {
	const [total, setTotal] = useState(qty * price);

	const control = useAnimation();

	const cardVariants = {
		clicked: {
			scale: 0.98,
			boxShadow: "0px 1px 1px 1px rgba(0, 0, 0, 0.15)",
			transition: {
				type: "spring",
				bounce: 0.7,
				duration: 0.08,
			},
		},
		hover: {
			scale: 1.01,
			boxShadow: "0px 3px 5px 5px rgba(0, 0, 0, 0.25)",
			transition: {
				type: "easeInOut",
				duration: 0.08,
			},
		},
	};

	return (
		<Link href={{ pathname: "/order/select[item]", query: { item: name } }}>
			<motion.a
				whileTap="clicked"
				whileHover="hover"
				animate={control}
				variants={cardVariants}
				className="checkout-item-container"
			>
				<div className="checkout-item-pic-container">
					<Image
						alt={name}
						className="checkout-item-pic"
						src={pic}
						layout="responsive"
						width="100%"
						height="100%"
					></Image>
				</div>
				<div className="checkout-item-info">
					<span className="checkout-item-name">{name}</span>
					<span className="ml-5 font-light">
						{qty} x Php {price}
					</span>
				</div>
				<span className="checkout-item-total">Php {total}</span>
			</motion.a>
		</Link>
	);
}

export default CheckoutCartItem;
