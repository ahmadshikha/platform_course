// routes/courseRoutes.js
import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  getCourseByCustomId,
  updateCourse,
  deleteCourse,
  enrollStudent,
  unenrollStudent,
  updateCourseRating,
  getTeacherCourses,
  getCategoryCourses
} from '../controllers/CourseController.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { _protect } from '../middlewares/authMiddleware.js';
// import { validateCourse } from '../middleware/validation.js';

const router = express.Router();

// Routes
router.post('/', _protect, createCourse);
router.get('/', getCourses);
router.get('/teacher/:teacherId', getTeacherCourses);
router.get('/category/:categoryId',  getCategoryCourses);
router.get('/:id',  getCourseById);
router.get('/custom/:courseId', getCourseByCustomId);
router.put('/:id', _protect, updateCourse);
router.delete('/:id', _protect, deleteCourse);



export default router;