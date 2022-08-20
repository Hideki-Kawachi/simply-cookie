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
			<div id="content-area">
				<span>
					SC was born out of a reignited passion for baking during the peak of
					the 2020 pandemic.
				</span>
			</div>
		</>
	);
}

export default AboutUs;
