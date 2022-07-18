import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import "../styles/globals.scss";

function __app({ Component, pageProps }) {
	useEffect(() => {
		if (sessionStorage.getItem("cart") == null) {
			sessionStorage.setItem(
				"cart",
				JSON.stringify([{ name: "", price: 0, qty: 0 }])
			);
			console.log("new session is: " + sessionStorage.getItem("cart"));
		}
		/*
		else {
			var cart = JSON.parse(sessionStorage.getItem("cart"));
			cart.push({ name: "sc classic", price: 240, qty: 5 });
			sessionStorage.setItem("cart", JSON.stringify(cart));
			console.log(
				"fetched session storage is: " + sessionStorage.getItem("cart")
			);
		}
		*/
	}, []);

	return (
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
	);
}

export default __app;
