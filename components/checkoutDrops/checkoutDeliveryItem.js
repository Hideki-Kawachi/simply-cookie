import React, { useState } from "react";

function CheckoutDeliveryItem({ date, slots }) {
	const [isClicked, setIsClicked] = useState(false);
	console.log("date:" + date + " was clicked!" + isClicked);
	return (
		<div
			className="checkout-delivery-item-container"
			onClick={() => setIsClicked(!isClicked)}
		>
			<span>{date}</span>
			<span>Slots Left: {slots}</span>
		</div>
	);
}

export default CheckoutDeliveryItem;
