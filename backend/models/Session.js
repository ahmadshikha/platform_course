// models/Session.js
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  startDate: Date,
  endDate: Date,
  times: String,
});

const Session = mongoose.model("Session", SessionSchema);
export default Session;
