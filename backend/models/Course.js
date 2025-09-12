// // models/Course.js
// import mongoose from "mongoose";

// const CourseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
//   categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
//   price: Number,
//   spots: Number
// });

// const Course = mongoose.model("Course", CourseSchema);
// export default Course;





// models/Course.js
import mongoose from "mongoose";


const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  type: { type: String, required: true },
  typeEn: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  locationEn: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['available', 'full', 'cancelled', 'completed'], 
    default: 'available' 
  },
  price: { type: String, required: true },
  seats: { type: Number, required: true, min: 1 },
  enrolled: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  description: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
  },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CourseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

CourseSchema.methods.enrollStudent = function() {
  if (this.enrolled < this.seats) {
    this.enrolled += 1;
    if (this.enrolled >= this.seats) {
      this.status = 'full';
    }
    return true;
  }
  return false;
};

const Course = mongoose.model("Course", CourseSchema);
export default Course;

