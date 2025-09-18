import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'اسم المستخدم مطلوب'],
    trim: true,
    minlength: [2, 'اسم المستخدم يجب أن يكون على الأقل حرفين'],
    maxlength: [50, 'اسم المستخدم يجب ألا يتجاوز 50 حرفاً']
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'البريد الإلكتروني غير صالح']
  },
  message: {
    type: String,
    required: [true, 'الرسالة مطلوبة'],
    trim: true,
    minlength: [5, 'الرسالة يجب أن تكون على الأقل 10 أحرف'],
    maxlength: [1000, 'الرسالة يجب ألا تتجاوز 1000 حرف']
  },

 

}, {
  timestamps: true
});

// إضافة فهرس للبحث
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;