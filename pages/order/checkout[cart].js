import React from "react";

export async function getServerSideProps(context) {
	context.query;
	return { props: { cookies } };
}

function Checkout() {
	return (
		<>
			<span>Checkout</span>
		</>
	);
}

export default Checkout;
