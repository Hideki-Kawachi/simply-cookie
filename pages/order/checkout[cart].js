import Link from "next/link";
import React, { useEffect, useState } from "react";
import CheckoutCartList from "../../components/checkoutDrops/checkoutCartList";
import CheckoutDeliveryList from "../../components/checkoutDrops/checkoutDeliveryList";
import CheckoutPayment from "../../components/checkoutDrops/checkoutPayment";
import Navbar from "../../components/navbar";
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
	//console.log("counter is:", counter, currentDay.getDay());
	//handles when the delivery schedule / order dates are reset... currently resets every monday
	// and re-updates delviery schedule to saturday and sunday with 5 slots each
	console.log("current day is:", currentDay.getDay(), counter);
	if (counter > 0 && currentDay.getDay() < 6) {
		let newDate = new Date();
		let newSched = []; // new schedule for delivery
		const slots = 5; //number of slots
		let dayAdd;

		for (dayAdd = 0; currentDay.getDay() + dayAdd != 6; dayAdd++);

		newDate.setDate(currentDay.getDate() + dayAdd); // update to saturday
		newSched.push({ date: new Date(newDate), slots: slots });

		newDate.setDate(newDate.getDate() + 1); // update to sunday
		newSched.push({ date: new Date(newDate), slots: slots });

		//console.log("new Sched is:", JSON.stringify(newSched));

		Schedule.updateOne(
			{},
			{ currentWeek: currentDay, schedule: newSched },
			(err, result) => {
				if (err) {
					console.log("error from updating sched:" + err);
				} else {
					//console.log("result of update is:" + JSON.stringify(result));
				}
			}
		);
	}

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
	const [mobileNumber, setMobileNumber] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [payment, setPayment] = useState(null);
	const [address, setAddress] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");
	const [isInvalid, setIsInvalid] = useState(false);
	const [success, setSuccess] = useState(true);

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

	function checkForm() {
		if (
			!(
				total > 0 &&
				firstName.length > 0 &&
				lastName.length > 0 &&
				mobileNumber.length > 0 &&
				payment != null &&
				address.length > 0
			)
		) {
			console.log("invalid");
			setIsInvalid(true);
		} else {
			console.log("passed");
			setIsInvalid(false);
			let name = firstName + " " + lastName;
			const uploadPayment = new FormData();
			uploadPayment.append("file", payment[0]);
			uploadPayment.append("upload_preset", "sc_payment");
			uploadPayment.append("folder", "Simply-Cookie/payments");

			let order = new FormData();

			fetch("https://api.cloudinary.com/v1_1/cloudurlhc/image/upload", {
				method: "POST",
				body: uploadPayment,
			})
				.then((res) => res.json())
				.then((data) => {
					order.append("firstName", firstName);
					order.append("lastName", lastName);
					order.append("mobileNumber", mobileNumber);
					order.append("payment", data.url);
					order.append("address", address);
					order.append("deliveryDate", deliveryDate);
					order.append("cart", cart);
					order.append("total", total);

					let orderJSON = {
						firstName: firstName,
						lastName: lastName,
						mobileNumber: mobileNumber,
						payment: data.url,
						address: address,
						deliveryDate: new Date(deliveryDate).toDateString(),
						cart: cartJSON,
						total: total,
					};

					fetch("/api/createOrder", {
						method: "POST",
						headers: {
							Accept: "application/json, text/plain, */*",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(orderJSON),
					})
						.then((res) => res.json())
						.then((data) => {
							if (data == "success") {
								setSuccess(true);
							}
						});
				});
		}

		console.log("total", finalCart, total);
		console.log("asd", firstName, lastName, mobileNumber, payment);
	}

	return (
		<>
			<div id="header">
				<div className="background">
					<div className="relative top-[50%] text-center">
						<span id="header-text">CHECKOUT</span>
					</div>
				</div>
			</div>
			<Navbar></Navbar>
			<div id="content-area" className="gap-1">
				{success ? (
					<>true</>
				) : (
					<>
						<CheckoutCartList
							finalCart={finalCart}
							total={total}
						></CheckoutCartList>
						<CheckoutDeliveryList
							schedule={schedule}
							deliveryDate={deliveryDate}
							setDeliveryDate={setDeliveryDate}
						></CheckoutDeliveryList>
						<CheckoutPayment
							setFirstName={setFirstName}
							setLastName={setLastName}
							setMobileNumber={setMobileNumber}
							setPayment={setPayment}
							setAddress={setAddress}
							mobileNumber={mobileNumber}
						></CheckoutPayment>
						{isInvalid ? (
							<span style={{ color: "red", fontWeight: 500 }}>
								Fill out missing details
							</span>
						) : (
							<></>
						)}
						<button
							onClick={() => checkForm()}
							className="checkout-submit-button"
						>
							Submit Order
						</button>
					</>
				)}
			</div>
		</>
	);
}

export default Checkout;
