import { motion } from "framer-motion";
import { stringifyQuery } from "next/dist/server/server-route-utils";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import OurCookieCard from "../components/ourCookieCard";
import connectToDB from "../db";
import OurCookie from "../mongoModels/ourCookieSchema";

export async function getServerSideProps() {
	await connectToDB();

	const ourCookies = JSON.stringify(await OurCookie.find({}));

	return { props: { ourCookies } };
}

function OurCookies({ ourCookies }) {
	const [cookies, setCookies] = useState(JSON.parse(ourCookies));

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
			<div id="content-area" style={{ padding: 0 }}>
				<motion.div
					initial="initial"
					animate="animate"
					variants={mainVariant}
					className="our-cookie-gradient"
				>
					{cookies.map((cookie, index) => (
						<OurCookieCard
							key={index}
							position={index + 1}
							name={cookie.name}
							pic={cookie.pic}
							description={cookie.description}
						></OurCookieCard>
					))}
				</motion.div>
			</div>
		</>
	);
}

export default OurCookies;
