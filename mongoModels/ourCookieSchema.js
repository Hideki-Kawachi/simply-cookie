import mongoose, { models, Schema } from "mongoose";

const ourCookieSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	pic: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const OurCookie =
	models.ourCookie || mongoose.model("ourCookie", ourCookieSchema);

export default OurCookie;
