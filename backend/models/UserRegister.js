
import mongoose from "mongoose";

const UserRegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true }
});

const courseRegistrationSchema = new mongoose.Schema({
  participantType: { 
    type: String, 
    enum: ['individual', 'group'], 
    required: true,
    default: 'individual'
  },
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { 
    type: String, 
    enum: ['male', 'female'], 
    required: true 
  },
  nationality: { type: String, required: true },
  idNumber: { type: String, required: true },
  streetAddress: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'البريد الإلكتروني غير صالح']
  },
  confirmEmail: { 
    type: String, 
    required: true,
    validate: {
      validator: function(email) {
        return email === this.email;
      },
      message: 'البريد الإلكتروني غير متطابق'
    }
  },
  courseNumber: { type: String, required: true },
  courseTitle: { type: String, required: true },
  participationReason: { type: String },
  educationLevel: { type: String, required: true },
  occupation: { type: String, required: true },
  companyName: { type: String },
  companyAddress: { type: String },
  emergencyContact: { type: UserRegisterSchema, required: true },
  specialNeeds: { type: String },
  additionalInfo: { type: String },
  agreeTerms: { 
    type: Boolean, 
    required: true,
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'يجب الموافقة على الشروط والأحكام'
    }
  },
  agreeDataProcessing: { 
    type: Boolean, 
    required: true,
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'يجب الموافقة على معالجة البيانات'
    }
  },
  receiveNewsletter: { type: Boolean, default: true },
  status: { 
    type: String, 
    // enum: ['pending', 'confirmed', 'cancelled', 'completed', 'waiting_list'], 
    enum: ["معلق","مؤكد", "ملغى", "مكتمل", "قائمة_الانتظار"],
    default: 'pending'
  },
  registrationDate: { type: Date, default: Date.now },

 
  notes: { type: String } 
});

courseRegistrationSchema.index({ email: 1, courseNumber: 1 });
courseRegistrationSchema.index({ status: 1, registrationDate: -1 });

//hi
courseRegistrationSchema.pre('save', function(next) {
  if (this.email !== this.confirmEmail) {
    return next(new Error('البريد الإلكتروني غير متطابق'));
  }
  next();
});

const UserRegister = mongoose.model("UserRegister", courseRegistrationSchema);
export default UserRegister;
