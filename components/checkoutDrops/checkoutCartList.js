import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import CheckoutCartItem from "./checkoutCartItem";

function CheckoutCartList({ finalCart, total }) {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownVariants = {
		start: {
			height: 0,
			padding: 0,
		},
		show: {
			height: "fit-content",
			padding: "10px",
			transition: {
				ease: "easeInOut",
				staggerChildren: "0.1",
				when: "beforeChildren",
				duration: 0.25,
			},
		},
		end: {
			height: 0,
			overflow: "hidden",
			padding: 0,
			transition: {
				ease: "easeInOut",
				staggerChildren: "0.05",
				when: "afterChildren",
				staggerDirection: "-1",
				duration: 0.2,
			},
		},
	};

	const itemVariants = {
		start: {
			width: "100%",
		},
		show: {
			opacity: 1,
			width: "100%",
			transition: {
				type: "spring",
				duration: 0.4,
				bounce: 0.4,
			},
		},
	};

	const dropdownOpen = {
		true: (
			<motion.div
				className="dropdown-list-container"
				initial="start"
				animate="show"
				exit="end"
				variants={dropdownVariants}
			>
				{finalCart.map((item) => (
					<motion.div key={item.name} variants={itemVariants}>
						<CheckoutCartItem
							name={item.name}
							price={item.price}
							qty={item.qty}
							pic={item.pic}
						></CheckoutCartItem>
					</motion.div>
				))}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ ease: "easeInOut", duration: 0.2 }}
					className="w-full text-right"
				>
					<hr className="checkout-line"></hr>
					<div className="flex flex-col">
						<span style={{ fontSize: 12, fontWeight: 300 }}>
							*Shipping to be paid by buyer
						</span>
						<span style={{ fontSize: 12, fontWeight: 300 }}>
							(Delivery is from Las Pinas)
						</span>
						<span className="checkout-total">Total: Php {total}</span>
					</div>
				</motion.div>
			</motion.div>
		),
	};

	return (
		<>
			<div className="dropdown-container" onClick={() => setIsOpen(!isOpen)}>
				<span>1. CART</span>
				<svg className="dropdown-arrow" viewBox="0 0 330 330">
					<path
						id="XMLID_225_"
						d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
					/>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
				</svg>
			</div>

			<AnimatePresence>{dropdownOpen[isOpen]}</AnimatePresence>
		</>
	);
}

export default CheckoutCartList;
