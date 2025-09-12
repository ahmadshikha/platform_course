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

const router = express.Router();

// Registration routes
router.post("/", createRegistration);
router.get("/", getRegistrations);
router.get("/:id", getRegistrationById);
router.patch("/:id/status", updateRegistrationStatus);
router.get("/course/:courseNumber", getRegistrationsByCourse);
router.get("/status/:status", getRegistrationsByStatus);
router.delete("/:id", deleteRegistration);

export default router;