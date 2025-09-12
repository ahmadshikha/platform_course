// models/Activity.js
import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: Date,
  location: String
});

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
