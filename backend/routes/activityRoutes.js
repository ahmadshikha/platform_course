import express from 'express';
import {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByDateRange
} from '../controllers/activityController.js';
import { _protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

// GET /api/activities - Get all activities
router.get('/', getAllActivities);

// GET /api/activities/date-range - Get activities by date range
router.get('/date-range', getActivitiesByDateRange);

// GET /api/activities/:id - Get single activity
router.get('/:id', getActivityById);

// POST /api/activities - Create new activity
router.post('/', _protect,createActivity);

// PUT /api/activities/:id - Update activity
router.put('/:id', updateActivity);

// DELETE /api/activities/:id - Delete activity
router.delete('/:id',_protect ,deleteActivity);

export default router;