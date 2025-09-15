// routes/adminRoutes.js
import express from "express";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin
} from "../controllers/AdminController.js";

const router = express.Router();

// Admin routes
router.post("/", createAdmin); // Create new admin
router.get("/", getAllAdmins); // Get all admins
router.get("/:id", getAdminById); // Get admin by ID
router.put("/:id", updateAdmin); // Update admin
router.delete("/:id", deleteAdmin); // Delete admin
router.post("/login", loginAdmin); // Admin login

export default router;
