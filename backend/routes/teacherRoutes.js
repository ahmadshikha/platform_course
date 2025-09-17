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
const router = express.Router();

// Teacher routes
router.get("/", getAllTeachers);
router.get('/:id/courses', getTeacherWithCourses);
router.get("/search", searchTeachers);
router.get("/:id", getTeacherById);
router.post('/', upload.single('image'), createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;