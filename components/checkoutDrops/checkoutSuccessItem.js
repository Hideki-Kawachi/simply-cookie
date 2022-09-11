import React, { useState } from "react";
import Image from "next/image";

function CheckoutSuccessItem({ name, pic, qty, price }) {
	const [total, setTotal] = useState(qty * price);

	return (
		<div className="checkout-item-container">
			<div className="checkout-item-pic-container">
				<Image
					alt={name}
					className="checkout-item-pic"
					src={pic}
					layout="responsive"
					width="100%"
					height="100%"
				></Image>
			</div>
			<div className="checkout-item-info">
				<span className="checkout-item-name">{name}</span>
				<span className="ml-5 font-light">
					{qty} x Php {price}
				</span>
			</div>
			<span className="checkout-item-total">Php {total}</span>
		</div>
	);
}

export default CheckoutSuccessItem;
