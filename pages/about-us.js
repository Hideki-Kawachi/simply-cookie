import React from "react";
import Navbar from "../components/navbar";

function AboutUs() {
	return (
		<>
			<div id="header">
				<div className="background">
					<div className="relative top-[50%] text-center">
						<span id="header-text">ABOUT US</span>
					</div>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area"></div>
		</>
	);
}

export default AboutUs;
