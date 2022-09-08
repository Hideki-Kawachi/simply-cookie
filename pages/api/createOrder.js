import { ObjectID } from "bson";
import connectToDB from "../../db";
import Order from "../../mongoModels/orderSchema";

export default async (req, res) => {
	console.log("api:", req.body);
	await connectToDB();

	let newCart = [];

	req.body.cart.forEach((item) => {
		newCart.push({ name: item.name, qty: item.qty });
	});

	console.log("new cart", newCart);

	await Order.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		mobileNumber: req.body.mobileNumber,
		payment: req.body.payment,
		address: req.body.address,
		deliveryDate: req.body.deliveryDate,
		cart: newCart,
		total: req.body.total,
	});

	res.json("success");
};
