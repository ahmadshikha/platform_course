import Admin from '../models/Admin.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "المشرف موجود بالفعل" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ 
      email, 
      password: hashedPassword,
      role: role || 'admin'
    });
    
    await admin.save();
    
    // Generate token
    const token = generateToken(admin._id);
    
    res.status(201).json({ 
      message: "تم إنشاء المشرف بنجاح", 
      admin: {
        _id: admin._id,
        email: admin.email,
        role: admin.role
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: "لم يتم العثور على المشرف" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// Update admin
export const updateAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let updateData = { email, role };
    
    // If password is provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({ message: "لم يتم العثور على المشرف" });
    }

    res.status(200).json({ message: "تم تحديث المشرف بنجاح", admin });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: "لم يتم العثور على المشرف" });
    }

    res.status(200).json({ message: "تم حذف المشرف بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// Login with JWT token
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = generateToken(admin._id);

    res.status(200).json({ 
      message: "تم تسجيل الدخول بنجاح", 
      admin: {
        _id: admin._id,
        email: admin.email,
        role: admin.role
      },
      token 
    });
    
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

// Get current admin profile
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};