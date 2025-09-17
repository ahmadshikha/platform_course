// controllers/adminController.js
import { generateToken, verifyToken } from "../js/jwt.js";
import Admin from "../models/Admin.js";
import bcrypt from 'bcryptjs';

export function auth(req, res) {
  console.log('auth...')
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({message: "unauthenticated"})
    }
    const decoded = verifyToken(token)

    return res.status(200).json({message: "authenticated"})
  } catch(e) {
    console.log('auth error', e)
    if(e.name == "TokenExpiredError") {
        res.clearCookie("token")
        return res.status(401).json({message: "token expired"})
    }
    if(e.name == "JsonWebTokenError") {
        res.clearCookie("token")
        console.log("here")
        return res.status(401).json({message: "unauthenticated"})
    }
    res.status(500).json({message: "server error"})
  }
}

// Create a new admin
// export const createAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const admin = new Admin({ email, password });
//     await admin.save();
    
//     res.status(201).json({ message: "Admin created successfully", admin });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



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
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update admin
export const updateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { email, password },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Simple login (without token)
// export const loginAdmin = async (req, res) => {
//   console.log('login admin controller')
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);
//     const admin = await Admin.findOne({email}).select('-password');

//     if (!admin) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, admin.password);
    
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
//     }
    

//   const token = generateToken(admin._id);

//   // const isPro = process.env.NODE_ENV === 'production';

//   const cookieOptions = {
//     path: '/',
//     httpOnly: true,
//     secure: true, 
//     sameSite: true,
//   };

//   res.cookie('token', token, cookieOptions);
//   res.status(200).json({ message: "Login successful", admin });

//   } catch (error) {

//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const loginAdmin = async (req, res) => {
  console.log('login admin controller - corrected version');
  try {
    const { email, password } = req.body;
    
    // البحث عن المدير مع تضمين كلمة المرور (المشكلة 1 و 2)
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // مقارنة كلمة المرور (الآن ممكنة لأننا جلبناها)
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
    }

    // توليد التوكن
    const token = generateToken(admin._id);

    // إعداد خيارات الكوكي مع تحسينات (المشكلة 4)
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      path: '/',
      httpOnly: true,
      secure: isProduction, 
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 ساعة
    };

    // إرسال التوكن في الكوكي
    res.cookie('token', token, cookieOptions);
    
    // إخفاء كلمة المرور من الاستجابة
    const adminWithoutPassword = { ...admin.toObject() };
    delete adminWithoutPassword.password;
    
    res.status(200).json({ 
      message: "Login successful", 
      admin: adminWithoutPassword 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};