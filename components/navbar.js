import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const menuVariants = {
	start: {
		right: 0,
		width: 0,
		overflow: "hidden",
	},
	show: {
		right: 0,
		width: "100%",
		transition: {
			ease: "easeInOut",
			staggerChildren: "0.1",
			when: "beforeChildren",
			duration: 0.35,
		},
	},
	end: {
		right: 0,
		width: 0,
		overflow: "hidden",
		transition: {
			ease: "easeOut",
			staggerChildren: "0.08",
			when: "afterChildren",
			staggerDirection: "-1",
			duration: 0.2,
		},
	},
};

const itemVariants = {
	start: {
		scale: 0.8,
		opacity: 0,
	},
	show: {
		scale: 1,
		opacity: 1,
		transition: {
			ease: "easeIn",
			duration: "0.2",
		},
	},
	end: {
		scale: 0.2,
		opacity: 0,
		transition: {
			ease: "easeIn",
			duration: "0.2",
		},
	},
	startHover: {
		scale: 1.2,
		textDecoration: "underline",
		transition: {
			ease: "easeIn",
			duration: "0.1",
		},
	},
	endHover: {
		scale: 1.0,
		textDecoration: "none",
	},
};

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [link, setLink] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (link.length > 0) {
			router.push(link);
		}
	}, [link]);

	function linkClicked(newLink) {
		setIsOpen(false);
		setTimeout(() => setLink(newLink), 720);
	}

	const menuPop = {
		true: (
			<motion.div
				id="menu-background"
				initial="start"
				animate="show"
				exit="end"
				variants={menuVariants}
			>
				<motion.span
					className="menu-items"
					variants={itemVariants}
					onClick={() => linkClicked("/")}
				>
					HOME
				</motion.span>

				<motion.span
					className="menu-items"
					variants={itemVariants}
					onClick={() => linkClicked("/our-cookies")}
				>
					OUR COOKIES
				</motion.span>

				<motion.span
					className="menu-items"
					variants={itemVariants}
					onClick={() => linkClicked("/order/menu")}
				>
					ORDER
				</motion.span>

				<motion.span
					className="menu-items"
					variants={itemVariants}
					onClick={() => linkClicked("/about-us")}
				>
					ABOUT US
				</motion.span>
			</motion.div>
		),
	};

	useEffect(() => {
		if (isOpen) {
			overflow();
		} else {
			setTimeout(overflow, 700);
		}
	}, [isOpen]);

	function overflow() {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}

	return (
		<>
			<motion.div
				whileTap={{ scale: 0.7 }}
				className="absolute z-[98] right-0 p-2 cursor-pointer"
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<svg
					width="30"
					height="30"
					strokeWidth={2}
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3 5H21"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M3 12H21"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M3 19H21"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</motion.div>

			<AnimatePresence>{menuPop[isOpen]}</AnimatePresence>
		</>
	);
}

export default Navbar;
