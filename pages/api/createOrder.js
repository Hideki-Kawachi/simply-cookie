import connectToDB from "../../db";
import Order from "../../mongoModels/orderSchema";
import Schedule from "../../mongoModels/scheduleSchema";

export default async (req, res) => {
	await connectToDB();

	let newCart = [];

	req.body.cart.forEach((item) => {
		newCart.push({
			cookie: item.name,
			quantity: parseInt(item.qty),
		});
	});

	console.log("new cart", newCart);

	await Order.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		mobileNumber: req.body.mobileNumber,
		payment: req.body.payment,
		address: req.body.address,
		deliveryDate: new Date(req.body.deliveryDate).toDateString(),
		cart: newCart,
		total: req.body.total,
	});

	let schedTemp = await Schedule.find({});
	console.log("sched", schedTemp[0].schedule);

	schedTemp[0].schedule.forEach((element) => {
		console.log("date is:", element.date);
		console.log("delivery date is:", req.body.deliveryDate);
		if (
			new Date(element.date).toDateString() ==
			new Date(req.body.deliveryDate).toDateString()
		) {
			element.slots = element.slots - 1;
			console.log("entering");
		}
	});

	Schedule.updateOne({}, { schedule: schedTemp[0].schedule }, (err, result) => {
		if (err) {
			console.log("error from updating sched:" + err);
		} else {
			console.log("success");
		}
	});

	res.json("success");
};
