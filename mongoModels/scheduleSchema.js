import mongoose, { models, Schema } from "mongoose";

const scheduleSchema = new Schema({
	currentWeek: {
		type: Date,
	},
	schedule: [{ date: { type: Date }, slots: { type: Number } }],
});

const Schedule = models.schedule || mongoose.model("schedule", scheduleSchema);

export default Schedule;
