import mongoose from "mongoose";

let uri =
	process.env.MONGODB_URI ||
	"mongodb+srv://Admin:AdminPassword@cluster0.qyaxn.mongodb.net/Simply-Cookie?retryWrites=true&w=majority";
// ?retryWrites=true&w=majority

if (!uri) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}
//console.log("trying to connect to db");
const connectToDB = async () => mongoose.connect(uri);

export default connectToDB;
