// middleware/validateObjectId.js
import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  const { teacherId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    return res.status(400).json({
      success: false,
      message: 'معرف غير صالح'
    });
  }
  
  next();
};