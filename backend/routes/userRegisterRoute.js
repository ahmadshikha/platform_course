// routes/userRegisterRoutes.js
import express from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  getRegistrationsByCourse,
  getRegistrationsByStatus,
  deleteRegistration
} from "../controllers/UserRegisterController.js";
import { _protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registration routes
router.post("/", createRegistration); // Public route for users to register
router.get("/", _protect, getRegistrations);
router.get("/:id", _protect, getRegistrationById);
router.patch("/:id/status", _protect, updateRegistrationStatus);
router.get("/course/:courseNumber", _protect, getRegistrationsByCourse);
router.get("/status/:status", _protect, getRegistrationsByStatus);
router.delete("/:id", _protect, deleteRegistration);

export default router;