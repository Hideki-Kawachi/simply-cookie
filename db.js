import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}
//console.log("trying to connect to db");
const connectToDB = async () => mongoose.connect(uri);

export default connectToDB;
