import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

function OurCookieCard({ name, pic, description, position }) {
	const mainVariant = {
		initial: {
			opacity: 1,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.4,
			},
		},
	};

	const titleVariant = {
		initial: {
			opacity: 0,
			top: "-30px",
		},
		animate: {
			opacity: 1,
			top: 0,
			transition: {
				ease: "easeOut",
				duration: 1.2,
			},
		},
	};

	const picVariant = {
		initial: {
			opacity: 0,
			left: "100vw",
		},
		animate: {
			opacity: 1,
			left: 0,
			transition: {
				ease: "easeOut",
				duration: 1.2,
			},
		},
	};

	const descriptionVariant = {
		initial: {
			opacity: 0,
			left: "-100vw",
		},
		animate: {
			opacity: 1,
			left: 0,
			transition: {
				ease: "easeOut",
				duration: 1.2,
			},
		},
	};

	/*
	style={
				position % 2 == 0
					? { backgroundColor: "rgba(48, 48, 48, 0.5)" }
					: { backgroundColor: "rgba(190, 190, 190, 0.5)" }
			}
	*/

	console.log("position:", position, "cookie:", name);
	return (
		<motion.div
			className="our-cookie-card-main-container"
			variants={mainVariant}
			style={position == 1 ? { paddingTop: "50px", paddingBottom: "0px" } : {}}
		>
			<motion.span className="our-cookie-card-title" variants={titleVariant}>
				{name}
			</motion.span>
			<motion.div
				className="our-cookie-card-pic-container"
				variants={picVariant}
			>
				<Image
					src={pic}
					layout="responsive"
					width="100%"
					height="100%"
					priority={true}
				></Image>
			</motion.div>
			<motion.div
				className="our-cookie-card-description-container"
				variants={descriptionVariant}
			>
				{description}
			</motion.div>
		</motion.div>
	);
}

export default OurCookieCard;
