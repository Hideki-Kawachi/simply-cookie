import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function CheckoutPayment({
	setFirstName,
	setLastName,
	setPayment,
	setMobileNumber,
	mobileNumber,
	setAddress,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isGcash, setIsGcash] = useState(true);

	const dropdownVariants = {
		start: {
			height: 0,
			padding: 0,
		},
		show: {
			height: "fit-content",
			padding: "10px",
			transition: {
				ease: "easeInOut",
				staggerChildren: "0.1",
				when: "beforeChildren",
				duration: 0.25,
			},
		},
		end: {
			height: 0,
			overflow: "hidden",
			padding: 0,
			transition: {
				ease: "easeInOut",
				staggerChildren: "0.05",
				when: "afterChildren",
				staggerDirection: "-1",
				duration: 0.2,
			},
		},
	};

	function numberHandler(val) {
		const newVal = val.replace(/[^0-9]/g, "");
		setMobileNumber(newVal);
	}

	const dropdownOpen = {
		true: (
			<motion.div
				id="payment"
				className="dropdown-list-container"
				initial="start"
				animate="show"
				exit="end"
				variants={dropdownVariants}
			>
				<form>
					<input
						id="mobile-number"
						type="tel"
						pattern="[0-9]{11}"
						placeholder="Mobile Number: 09173129421"
						required
						value={mobileNumber}
						onChange={(e) => numberHandler(e.currentTarget.value)}
					></input>
					<input
						id="first-name"
						type="text"
						placeholder="First Name: John"
						required
						onChange={(e) => setFirstName(e.currentTarget.value)}
					></input>
					<input
						id="last-name"
						type="text"
						placeholder="Last Name: Cruz"
						required
						onChange={(e) => setLastName(e.currentTarget.value)}
					></input>
					<input
						id="address"
						type="text"
						placeholder="Address: 27 Cookie Street, Baked City"
						required
						onChange={(e) => setAddress(e.currentTarget.value)}
					></input>
					<div className="payment-details-main-container">
						{isGcash ? (
							<>
								<div className="payment-details-button-container">
									<span
										onClick={() => setIsGcash(true)}
										style={{ backgroundColor: "rgba(125, 125, 125, 1)" }}
									>
										GCash
									</span>
									<span onClick={() => setIsGcash(false)}>BPI</span>
								</div>

								<div
									className="payment-details-under-container"
									style={{ borderRadius: "0px 10px 10px 10px" }}
								>
									<Image
										alt="GCASH qr code"
										className="payment-details-pic"
										layout="responsive"
										width="100%"
										height="100%"
										src={
											"https://res.cloudinary.com/cloudurlhc/image/upload/v1660973260/Simply-Cookie/gcash_omhvff.jpg"
										}
									></Image>
								</div>
							</>
						) : (
							<>
								<div className="payment-details-button-container">
									<span onClick={() => setIsGcash(true)}>GCash</span>
									<span
										onClick={() => setIsGcash(false)}
										style={{ backgroundColor: "rgba(125, 125, 125, 1)" }}
									>
										BPI
									</span>
								</div>

								<div className="payment-details-under-container">
									<Image
										alt="BPI qr code"
										className="payment-details-pic"
										layout="responsive"
										width="100%"
										height="100%"
										src={
											"https://res.cloudinary.com/cloudurlhc/image/upload/v1660973207/Simply-Cookie/bpi_rd9qbo.jpg"
										}
									></Image>
								</div>
							</>
						)}
					</div>
					<label className="upload-label" htmlFor="payment-screenshot">
						<svg
							className="upload-icon"
							x="0px"
							y="0px"
							viewBox="0 0 489.95 489.95"
						>
							<g>
								<g>
									<path
										d="M431.175,427.85v-200.5c0-34.2-27.9-62.1-62.1-62.1h-40.2c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h40.2
			c20.7,0,37.6,16.9,37.6,37.6v200.6c0,20.7-16.9,37.6-37.6,37.6h-248.2c-20.7,0-37.6-16.9-37.6-37.6v-200.7
			c0-20.7,16.9-37.6,37.6-37.6h40.2c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-40.2c-34.2,0-62.1,27.9-62.1,62.1v200.6
			c0,34.2,27.9,62.1,62.1,62.1h248.2C403.375,489.95,431.175,462.15,431.175,427.85z"
									/>
									<path
										d="M152.475,104.55c4.8,4.8,12.5,4.8,17.3,0l63-63v229.8c0,6.8,5.5,12.3,12.3,12.3c6.8,0,12.3-5.5,12.3-12.3V41.65l63,63
			c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9c-4.6-4.6-12.7-4.6-17.3,0l-83.9,83.9
			C147.675,92.05,147.675,99.75,152.475,104.55z"
									/>
								</g>
							</g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
							<g></g>
						</svg>
						<span>Upload Screenshot of Payment</span>
					</label>
					<input
						id="payment-screenshot"
						type="file"
						accept="image/*"
						required
						onChange={(e) => setPayment(e.currentTarget.value)}
					></input>
					<span className="validity"></span>
				</form>
			</motion.div>
		),
	};

	return (
		<>
			<div className="dropdown-container" onClick={() => setIsOpen(!isOpen)}>
				<span>3. PAYMENT</span>
				<svg className="dropdown-arrow" viewBox="0 0 330 330">
					<path
						id="XMLID_225_"
						d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
					/>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
				</svg>
			</div>

			<AnimatePresence>{dropdownOpen[isOpen]}</AnimatePresence>
		</>
	);
}

export default CheckoutPayment;
