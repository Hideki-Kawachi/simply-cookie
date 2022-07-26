import React from "react";
import OrderStepsArrow from "./orderStepsArrow";

function OrderSteps({ step }) {
	return (
		<div id="order-steps-container">
			<div className="order-steps-fill">
				<span className="order-steps">1. Checkout</span>
				<OrderStepsArrow></OrderStepsArrow>
			</div>
			<div className="order-steps-fill">
				<span className="order-steps">2. Delivery Date</span>
				<OrderStepsArrow></OrderStepsArrow>
			</div>
			<div className="order-steps-fill">
				<span className="order-steps">3. Payment & details</span>
			</div>
		</div>
	);
}

export default OrderSteps;
