// models/Teacher.js
import mongoose from "mongoose";


const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true }
});

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const socialSchema = new mongoose.Schema({
  linkedin: { type: String },
  twitter: { type: String }
});

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, default: "/placeholder.svg" },
  bio: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  review: { type: Number, default: 0 },
  students: { type: Number, default: 0 },
  course: { type: Number, default: 0 },
  specialties: [{ type: String }],
  education: [educationSchema],
  contact: contactSchema,
  social: socialSchema,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TeacherSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;
