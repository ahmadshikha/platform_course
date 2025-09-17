

// models/Course.js
import mongoose from "mongoose";


const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // المعرف الفريد للدورة
  title: { type: String, required: true }, // عنوان الدورة
  type: { type: String, required: true }, // نوع الدورة (اختبار، ورشة، دورة تدريبية)
  date: { type: String, required: true }, // تاريخ الدورة
  time: { type: String, required: true }, // وقت الدورة
  duration: { type: String, required: true }, // مدة الدورة
  location: { type: String, required: true }, // مكان انعقاد الدورة
  status: { 
    type: String, 
    // enum: ['available', 'full', 'cancelled', 'completed'], 
    enum: ["متوفر", "ممتلئ", "ملغى", "مكتمل"], 
    default: 'متوفر'
  },
  maxParticipants:{type:Number},
  price: { type: String, required: true },
  seats: { type: Number, required: true, min: 1 },
  enrolled: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  description: { type: String, required: true },
  details: { type: String, required: true },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
  }, // المدرب (مرتبط بنموذج Teacher)
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // التصنيف
  isActive: { type: Boolean, default: true }, // هل الدورة مفعلة؟
  createdAt: { type: Date, default: Date.now }, // تاريخ الإنشاء
  updatedAt: { type: Date, default: Date.now } // تاريخ آخر تحديث
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

