// models/CourseTag.js
import mongoose from "mongoose";

const CourseTagSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  tagId: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
});

const CourseTag = mongoose.model("CourseTag", CourseTagSchema);
export default CourseTag;
