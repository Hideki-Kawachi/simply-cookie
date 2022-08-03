import Link from "next/link";
import React, { useEffect, useState } from "react";
import CheckoutCartList from "../../components/checkoutDrops/checkoutCartList";
import CheckoutDeliveryList from "../../components/checkoutDrops/checkoutDeliveryList";
import CheckoutPayment from "../../components/checkoutDrops/checkoutPayment";
import Navbar from "../../components/navbar";
import OrderSteps from "../../components/orderSteps";
import connectToDB from "../../db";
import Cookie from "../../mongoModels/cookieSchema";
import Schedule from "../../mongoModels/scheduleSchema";

export async function getServerSideProps(context) {
	await connectToDB();

	const cart = JSON.parse(context.query.cart);
	let temp = await findCookies(cart);
	let cookies = JSON.stringify(temp);
	let schedTemp = await Schedule.find({});
	let sched = JSON.stringify(schedTemp[0]);
	let currentDay = new Date();
	let currentWeek = new Date(schedTemp[0].currentWeek);
	let counter = 0;

	while (currentWeek.toDateString() != currentDay.toDateString()) {
		currentWeek.setDate(currentWeek.getDate() + 1);
		counter++;
	}

	//handles when the delivery schedule / order dates are reset... currently resets every sunday
	// and re-updates delviery schedule to saturday and sunday with 5 slots each
	if (counter > 0 && currentDay.getDay() == 0) {
		let newDate = new Date();
		let newSched = []; // new schedule for delivery
		const slots = 5; //number of slots

		newDate.setDate(currentDay.getDate() + 6); // update to saturday
		newSched.push({ date: new Date(newDate), slots: slots });

		newDate.setDate(newDate.getDate() + 1); // update to sunday
		newSched.push({ date: new Date(newDate), slots: slots });

		console.log("new Sched is:" + JSON.stringify(newSched));
		Schedule.updateOne(
			{},
			{ currentWeek: currentDay, schedule: newSched },
			(err, result) => {
				if (err) {
					console.log("error from updating sched:" + err);
				} else {
					console.log("result of update is:" + result);
				}
			}
		);
	}

	console.log("finished");
	return {
		props: { cart: context.query.cart, cookies: cookies, schedule: sched },
	};
}

async function findCookies(cart) {
	let temp = [];
	cart.forEach((item) => {
		temp.push(Cookie.findOne({ name: item.name }, "name price pic").exec());
	});

	let final = await Promise.all(temp);
	return final;
}

function Checkout({ cart, cookies, schedule }) {
	const cookieJSON = JSON.parse(cookies);
	const cartJSON = JSON.parse(cart);
	const finalCart = [];
	const [total, setTotal] = useState(0);

	cookieJSON.forEach((cookie) => {
		let cartItem = cartJSON.find((item) => {
			return item.name == cookie.name;
		});
		if (cartItem != undefined) {
			finalCart.push({
				name: cookie.name,
				price: cookie.price,
				qty: cartItem.qty,
				pic: cookie.pic,
			});
		}
	});

	useEffect(() => {
		let tempTotal = 0;
		finalCart.forEach((item) => {
			tempTotal += item.qty * item.price;
		});
		setTotal(tempTotal);
	}, []);

	return (
		<>
			<div
				id="header"
				className="h-[13vh] w-[100vw] flex flex-col justify-center"
			>
				<div className="relative top-[50%] text-center">
					<span id="header-text">CHECKOUT</span>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area" className="gap-1">
				<CheckoutCartList
					finalCart={finalCart}
					total={total}
				></CheckoutCartList>
				<CheckoutDeliveryList schedule={schedule}></CheckoutDeliveryList>
				<CheckoutPayment></CheckoutPayment>
			</div>
		</>
	);
}

export default Checkout;
