// routes/teacherRoutes.js
import express from "express";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  searchTeachers,
  getTeacherWithCourses
} from "../controllers/teacherController.js";
import upload from '../middlewares/upload.js';
import { _protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Teacher routes
router.get("/", getAllTeachers);
router.get('/:id/courses', getTeacherWithCourses);
router.get("/search", searchTeachers);
router.get("/:id", getTeacherById);
router.post('/', _protect, upload.single('image'), createTeacher);
router.put("/:id", _protect, updateTeacher);
router.delete("/:id", _protect, deleteTeacher);

export default router;