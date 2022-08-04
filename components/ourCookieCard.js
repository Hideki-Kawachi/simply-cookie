import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

function OurCookieCard({ name, pic }) {
	console.log("name:", name, "pic:", pic);

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

	return (
		<motion.div
			className="our-cookie-card-main-container"
			variants={mainVariant}
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
			<motion.span
				className="our-cookie-card-description"
				variants={descriptionVariant}
			>
				description stuff
			</motion.span>
		</motion.div>
	);
}

export default OurCookieCard;
