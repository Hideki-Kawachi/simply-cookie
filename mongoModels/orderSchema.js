import mongoose, { models, Schema } from "mongoose";

const orderSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	mobileNumber: { type: Number, required: true },
	payment: { type: String, required: true },
	address: { type: String, required: true },
	deliveryDate: { type: String, required: true },
	cart: [{ cookie: { type: String }, quantity: { type: Number } }],
	total: { type: Number, required: true },
});

const Order = models.order || mongoose.model("order", orderSchema);

export default Order;
