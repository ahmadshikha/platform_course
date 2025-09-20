import Activity from '../models/Activity.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; 
// Get all activities
  export const getAllActivities = async (req, res) => {
    try {
      const activities = await Activity.find().sort({ date: 1 });
      res.status(200).json({
        success: true,
        data: activities,
        count: activities.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching activities',
        error: error.message
      });
    }
  };

// Get single activity by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activity',
      error: error.message
    });
  }
};

// Create new activity
export const createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const savedActivity = await activity.save();
    res.status(201).json({
      success: true,
      data: savedActivity,
      message: 'Activity created successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating activity',
      error: error.message
    });
  }
};

// Update activity
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    res.status(200).json({
      success: true,
      data: activity,
      message: 'Activity updated successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating activity',
      error: error.message
    });
  }
};

// Delete activity
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting activity',
      error: error.message
    });
  }
};

// Get activities by date range
export const getActivitiesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const activities = await Activity.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: activities,
      count: activities.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activities by date range',
      error: error.message
    });
  }
};