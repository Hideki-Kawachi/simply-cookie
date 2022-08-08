import Navbar from "../components/navbar";
import scLogo3 from "../animations/scLogo3.json";
import Lottie from "lottie-web";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import Image from "next/image";

export async function getServerSideProps() {
	const carouselImages = [
		"https://res.cloudinary.com/cloudurlhc/image/upload/v1659458557/Simply-Cookie/Carousel/cookie6_jdayic.jpg",
		"https://res.cloudinary.com/cloudurlhc/image/upload/v1659458584/Simply-Cookie/Carousel/BEE_0532_orvfb8.jpg",
		"https://res.cloudinary.com/cloudurlhc/image/upload/v1659458602/Simply-Cookie/Carousel/BEE_0515_f85yjp.jpg",
		"https://res.cloudinary.com/cloudurlhc/image/upload/v1659458621/Simply-Cookie/Carousel/BEE_0616_cycc8n.jpg",
	];

	return { props: { carouselImages } };
}

export default function Home({ carouselImages }) {
	const [newPosition, setNewPosition] = useState(0);
	const timer = React.useRef();
	let position = newPosition;

	useEffect(
		() => () => {
			clearInterval(timer.current);
		},
		[]
	);

	useEffect(() => {
		timer.current = setInterval(() => {
			if (position < carouselImages.length - 1) {
				position++;
				setNewPosition(position);
			} else {
				position = 0;
				setNewPosition(position);
			}
		}, 4500); // change your switch time here.
		return () => clearInterval(timer.current);
	});

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

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			clearInterval(timer.current);
			if (newPosition < carouselImages.length - 1) {
				setNewPosition(newPosition + 1);
			} else {
				setNewPosition(0);
			}
		},
		onSwipedRight: () => {
			clearInterval(timer.current);
			if (newPosition > 0) {
				setNewPosition(newPosition - 1);
			} else {
				setNewPosition(carouselImages.length - 1);
			}
		},
	});

	return (
		<>
			<div id="header">
				<div className="background">
					<div
						id="logo"
						className="w-[100px] h-[100px] overflow-hidden relative top-[50%]"
					></div>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area">
				<div className="carousel-main-container" {...handlers}>
					<div className="carousel-reel-container">
						{carouselImages.map((items, index) => (
							<motion.div
								key={index}
								className="carousel-image"
								initial={{
									opacity: 0,
									left: `${(index - newPosition) * 100}%`,
								}}
								animate={{
									opacity: 1,
									scale: index === position ? 1 : 0.9,
									left: `${(index - newPosition) * 100}%`,
								}}
								transition={{
									type: "easeInOut",
									duration: 0.85,
								}}
							>
								<Image
									priority={true}
									src={items}
									layout="responsive"
									width="100%"
									height={(100 / 4) * 3}
								></Image>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
