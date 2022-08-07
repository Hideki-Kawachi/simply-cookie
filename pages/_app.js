import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import "../styles/globals.scss";
import { motion, useAnimation } from "framer-motion";
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

	/*
	{loading ? (
				<>
					<LoadingCookie></LoadingCookie>
					<div id="loading-container">
						<header>
							<title>Simply Cookie</title>
							<meta name="description" content="Simply Cookie Website" />
							<link rel="icon" href="/favicon.ico" />
							<link rel="preconnect" href="https://fonts.googleapis.com" />
							<link rel="preconnect" href="https://fonts.gstatic.com" />
							<link
								href="https://fonts.googleapis.com/css2?family=Caramel&family=Montserrat:wght@100;300;400;500&display=swap"
								rel="stylesheet"
							/>
						</header>

						<Component {...pageProps} />
						<Footer></Footer>
					</div>
				</>
			) : (
				<>
					<header>
						<title>Simply Cookie</title>
						<meta name="description" content="Simply Cookie Website" />
						<link rel="icon" href="/favicon.ico" />
						<link rel="preconnect" href="https://fonts.googleapis.com" />
						<link rel="preconnect" href="https://fonts.gstatic.com" />
						<link
							href="https://fonts.googleapis.com/css2?family=Caramel&family=Montserrat:wght@100;300;400;500&display=swap"
							rel="stylesheet"
						/>
					</header>
					<Component {...pageProps} />
					<Footer></Footer>
				</>
			)}
	*/

	return (
		<>
			{loading ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ ease: "easeOut", duration: 0.15 }}
					className="absolute w-[100vw] h-[100vh] z-[99]"
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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Caramel&family=Montserrat:wght@100;300;400;500&display=swap"
					rel="stylesheet"
				/>
			</header>

			<Component {...pageProps} />
			<Footer></Footer>
		</>
	);
}

export default __app;
