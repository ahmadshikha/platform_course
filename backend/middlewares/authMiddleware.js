import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { verifyToken } from "../js/jwt.js";

export function _protect(req, res, next) {
  try {
    console.log('_protect middleware')
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ message: "unauthenticated" })
    }
    verifyToken(token)
    next()
    
  } catch (e) {
    console.log('auth middleware error', e)
    if (e.name == "TokenExpiredError") {
        res.clearCookie("token")
        return res.status(401).json({ message: "token expired" })
    }
    if (e.name == "JsonWebTokenError") {
        res.clearCookie("token")
        return res.status(401).json({ message: "unauthenticated" })
    }
    return res.status(500).json({ message: "server error" })
  }
}

// Middleware to protect routes
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: "ليس مصرحًا لك بالوصول، يلزم وجود token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get admin from token
    req.admin = await Admin.findById(decoded.id).select('-password');
    
    if (!req.admin) {
      return res.status(401).json({ message: "لم يعد Token صالحًا" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "ليس مصرحًا لك بالوصول" });
  }
};

// Middleware to check admin role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ 
        message: `دور ${req.admin.role} غير مصرح له بالوصول إلى هذا المورد` 
      });
    }
    next();
  };
};