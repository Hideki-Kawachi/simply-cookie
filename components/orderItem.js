import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import React from "react";

function OrderItem({ name, price, qty, description, pic }) {
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
				className="order-item-main"
			>
				<div className="order-item-pic-container">
					<Image
						alt={name}
						className="order-item-pic"
						src={pic}
						layout="responsive"
						width="100%"
						height="100%"
					></Image>
				</div>
				<div className="order-item-description-container">
					<h1 className="order-item-name">{name}</h1>
					<hr></hr>
					<span className="order-item-description">{description}</span>
				</div>
			</motion.a>
		</Link>

		/*<motion.div whileTap="clicked" whileHover="hover" animate={control} variants={cardVariants} className='order-item-main' onClick={()=>router.push("/orderSelect")}>*/
	);
}

export default OrderItem;
