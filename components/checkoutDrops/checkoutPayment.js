import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

function CheckoutPayment() {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownVariants = {
		start: {
			width: "95vw",
			height: 0,
			padding: 0,
		},
		show: {
			height: "fit-content",
			width: "95vw",
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
			width: "95vw",
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

	const dropdownOpen = {
		true: (
			<motion.div
				id="payment"
				className="dropdown-list-container"
				initial="start"
				animate="show"
				exit="end"
				variants={dropdownVariants}
			>
				<form>
					<input
						id="mobile-numer"
						type="number"
						pattern="[0-9]{11}"
						placeholder="Mobile Number: 09173129421"
						required
					></input>
					<input
						id="first-name"
						type="text"
						placeholder="First Name: John"
						required
					></input>
					<input
						id="last-name"
						type="text"
						placeholder="Last Name: Cruz"
						required
					></input>
					<label htmlFor="payment-screenshot">Payment Screenshot</label>
					<input
						id="payment-screenshot"
						type="file"
						accept="image/*"
						required
					></input>
					<span className="validity"></span>
				</form>
			</motion.div>
		),
	};

	return (
		<>
			<div className="dropdown-container" onClick={() => setIsOpen(!isOpen)}>
				<span>3. PAYMENT</span>
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

export default CheckoutPayment;
