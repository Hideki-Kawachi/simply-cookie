import React, { useEffect, useState } from "react";

function CheckoutDeliveryItem({ date, slots, setDeliveryDate, deliveryDate }) {
	const [isClicked, setIsClicked] = useState(false);
	const dateInfo = new Date(date);
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	const dateShow = day[dateInfo.getUTCDay()].concat(
		", ",
		month[dateInfo.getUTCMonth()],
		" ",
		dateInfo.getUTCDate().toString(),
		" ",
		dateInfo.getUTCFullYear().toString()
	);

	function clicked() {
		setIsClicked(!isClicked);
		setDeliveryDate(date);
	}

	useEffect(() => {
		if (deliveryDate == date) {
			setIsClicked(true);
		} else {
			setIsClicked(false);
		}
	}, [deliveryDate]);

	function isHighlighted() {
		if (isClicked) {
			return (
				<div
					className="checkout-delivery-item-container-clicked"
					onClick={() => clicked()}
				>
					<span style={{ fontWeight: 500 }}>{dateShow}</span>
					<span style={{ fontWeight: 300 }}>Slots Left: {slots}</span>
				</div>
			);
		} else {
			return (
				<div
					className="checkout-delivery-item-container"
					onClick={() => clicked()}
				>
					<span style={{ fontWeight: 500 }}>{dateShow}</span>
					<span style={{ fontWeight: 300 }}>Slots Left: {slots}</span>
				</div>
			);
		}
	}

	return <>{isHighlighted()}</>;
}

export default CheckoutDeliveryItem;
