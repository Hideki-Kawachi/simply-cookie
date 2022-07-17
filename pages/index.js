import Navbar from "../components/navbar";
import scLogo3 from "../animations/scLogo3.json";
import Lottie from "lottie-web";
import React, { useEffect, useState } from "react";

export default function Home() {
	useEffect(() => {
		var logoAnimation = Lottie.loadAnimation({
			// @ts-ignore
			container: document.getElementById("logo"),
			renderer: "svg",
			loop: false,
			autoplay: true,
			animationData: scLogo3,
		});
		logoAnimation.setSpeed(0.8);
	}, []);

	return (
		<>
			<div
				id="header"
				className="h-[13vh] w-[100vw] flex flex-col justify-center"
			>
				<div
					id="logo"
					className="w-[100px] h-[100px] overflow-hidden relative top-[50%]"
				></div>
			</div>
			<Navbar></Navbar>
		</>
	);
}
