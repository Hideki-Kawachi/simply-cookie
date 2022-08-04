import { motion } from "framer-motion";
import { stringifyQuery } from "next/dist/server/server-route-utils";
import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import OurCookieCard from "../components/ourCookieCard";

export async function getServerSideProps() {
	const images = [
		"https://res.cloudinary.com/cloudurlhc/image/upload/v1659546418/Simply-Cookie/our%20cookies/SC%20CLASSIC.png",
		"https://res.cloudinary.com/cloudurlhc/image/upload/v1659546399/Simply-Cookie/our%20cookies/CHOCO%20WALNUT.png",
	];

	let cookies = [];

	images.forEach((item, index) => {
		let splitImages = item.split("/");
		let temp = splitImages[splitImages.length - 1].split("%20");
		let tempName = temp[0].concat(" ", temp[1]);
		let newName = tempName.split(".");

		cookies.push({ name: newName[0], pic: item });
	});

	return { props: { cookies } };
}

function OurCookies({ cookies }) {
	const mainVariant = {
		initial: {
			opacity: 1,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 1.5,
			},
		},
	};

	return (
		<>
			<div
				id="header"
				className="h-[13vh] w-[100vw] flex flex-col justify-center"
			>
				<div className="relative top-[50%] text-center">
					<span id="header-text">OUR COOKIES</span>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area">
				<motion.div initial="initial" animate="animate" variants={mainVariant}>
					{cookies.map((cookie, index) => (
						<OurCookieCard
							key={index}
							name={cookie.name}
							pic={cookie.pic}
						></OurCookieCard>
					))}
				</motion.div>
			</div>
		</>
	);
}

export default OurCookies;
