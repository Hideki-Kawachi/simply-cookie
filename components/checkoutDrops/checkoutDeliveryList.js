import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CheckoutDeliveryItem from "./checkoutDeliveryItem";

function CheckoutDeliveryList({ schedule, setDeliveryDate, deliveryDate }) {
	const [isOpen, setIsOpen] = useState(false);

	const scheduleJSON = JSON.parse(schedule);

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
			scale: 0.97,
			width: "80%",
		},
		show: {
			opacity: 1,
			scale: 1,
			width: "80%",
			transition: {
				type: "spring",
				duration: 0.4,
				bounce: 0.6,
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
				{scheduleJSON.schedule.map((sched) => (
					<motion.div key={sched.date} variants={itemVariants}>
						<CheckoutDeliveryItem
							date={sched.date}
							slots={sched.slots}
							setDeliveryDate={setDeliveryDate}
							deliveryDate={deliveryDate}
						></CheckoutDeliveryItem>
					</motion.div>
				))}
			</motion.div>
		),
	};

	return (
		<>
			<div className="dropdown-container" onClick={() => setIsOpen(!isOpen)}>
				<span>2. DELIVERY DATE</span>
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

export default CheckoutDeliveryList;
