// routes/teacherRoutes.js
import express from "express";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  searchTeachers
} from "../controllers/teacherController.js";

const router = express.Router();

// Teacher routes
router.get("/", getAllTeachers);
router.get("/search", searchTeachers);
router.get("/:id", getTeacherById);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;