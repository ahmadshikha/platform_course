// controllers/adminController.js
import { generateToken, verifyToken } from "../js/jwt.js";
import Admin from "../models/Admin.js";

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
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ email, password });
    await admin.save();
    
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
export const loginAdmin = async (req, res) => {
  console.log('login admin controller')
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password }).select('-password');

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  const token = generateToken(admin._id);

  // const isPro = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true, 
    sameSite: true,
  };

  res.cookie('token', token, cookieOptions);
  res.status(200).json({ message: "Login successful", admin });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};