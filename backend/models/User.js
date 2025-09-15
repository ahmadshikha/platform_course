
import mongoose from "mongoose";


const enrollmentSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  enrollmentDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['enrolled', 'completed', 'cancelled'], 
    default: 'enrolled' 
  }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  enrollments: [enrollmentSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


const User = mongoose.model("User", UserSchema);
export default User;
