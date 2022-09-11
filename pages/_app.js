import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import "../styles/globals.scss";
import { motion } from "framer-motion";
import LoadingCookie from "../components/loadingCookie";

function __app({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem("cart") == null) {
			sessionStorage.setItem(
				"cart",
				JSON.stringify([{ name: "", price: 0, qty: 0 }])
			);
		}

		const start = () => {
			setLoading(true);
		};
		const end = () => {
			setLoading(false);
		};
		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);
		return () => {
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
		};
	}, []);

	return (
		<>
			{loading ? (
				<motion.div
					initial={{ opacity: 0, height: `${document.body.scrollHeight}px` }}
					animate={{ opacity: 1, height: `${document.body.scrollHeight}px` }}
					exit={{ opacity: 0, height: `${document.body.scrollHeight}px` }}
					transition={{ ease: "easeOut", duration: 0.15 }}
					className="absolute top-0 bottom-0 right-0 left-0 z-[99]"
				>
					<LoadingCookie></LoadingCookie>
					<div id="loading-container"></div>
				</motion.div>
			) : (
				<></>
			)}

			<header>
				<title>Simply Cookie</title>
				<meta name="description" content="Simply Cookie Website" />
				<link rel="icon" href="/favicon.ico" />
			</header>

			<Component {...pageProps} />
			<Footer></Footer>
		</>
	);
}

export default __app;
