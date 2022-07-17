import mongoose, { models, Schema } from "mongoose";

const cookieSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	qty: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	pic: {
		type: String,
		required: true,
	},
});

const Cookie = models.cookie || mongoose.model("cookie", cookieSchema);

export default Cookie;
