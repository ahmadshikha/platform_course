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
// import { validateCourse } from '../middleware/validation.js';

const router = express.Router();

// Routes
router.post('/', createCourse);
router.get('/', getCourses);
router.get('/getteacherwithcourse/:teacherId', getTeacherCourses);
router.get('/category/:categoryId',  getCategoryCourses);
router.get('/:id',  getCourseById);
router.get('/custom/:courseId', getCourseByCustomId);
router.put('/:id', updateCourse);
router.delete('/:id', validateObjectId, deleteCourse);



export default router;