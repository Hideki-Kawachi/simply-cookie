import React from 'react';

export async function getServerSideProps(context) {
    context.query
	return { props: { cookies } };
}

function Checkout() {
    return (  );
}

export default Checkout;