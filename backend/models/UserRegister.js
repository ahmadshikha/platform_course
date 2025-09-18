
import mongoose from "mongoose";

const UserRegisterSchemaString = new mongoose.Schema({
  name: { type: String, },
  relationship: { type: String, },
  phone: { type: String, }
});

const courseRegistrationSchema = new mongoose.Schema({
  participantType: { 
    type: String, 
    enum: ['individual', 'group'], 
String,
    default: 'individual'
  },
  title: { type: String},
  firstName: { type: String, },
  lastName: { type: String, },
  birthDate: { type: String, },
  gender: { 
    type: String, 
    enum: ['male', 'female'], 
String, 
  },
  nationality: { type: String },
  // idNumber: { type: String, },
  streetAddress: { type: String},
  // postalCode: { type: String, },
  city: { type: String, },
  country: { type: String, },
  phone: { type: String, },
  mobile: { type: String, },
  email: { 
    type: String, 
String,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'البريد الإلكتروني غير صالح']
  },
  confirmEmail: { 
    type: String, 
    
    validate: {
      validator: function(email) {
        return email === this.email;
      },
      message: 'البريد الإلكتروني غير متطابق'
    }
  },
  courseNumber: { type: String, },
  // courseTitle: { type: String, },
  participationReason: { type: String },
  educationLevel: { type: String, },
  // occupation: { type: String, },
  companyName: { type: String },
  companyAddress: { type: String },
  emergencyContact: { type: UserRegisterSchemaString },
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
    default: 'معلق'
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
