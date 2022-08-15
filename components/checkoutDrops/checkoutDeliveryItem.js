import React, { useEffect, useState } from "react";

function CheckoutDeliveryItem({ date, slots, setDeliveryDate, deliveryDate }) {
	const [isClicked, setIsClicked] = useState(false);
	const dateShow = new Date(new Date(date).toUTCString()).toDateString();

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
