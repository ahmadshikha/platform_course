// controllers/courseController.js
import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';
import Category from '../models/Category.js';

// إنشاء دورة جديدة
export const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    
    // التحقق من وجود المعلم
    const teacher = await Teacher.findById(courseData.teacher);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
    
    // التحقق من وجود الفئة إذا تم توفيرها
    if (courseData.categoryId) {
      const category = await Category.findById(courseData.categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
    }
    
    const course = new Course(courseData);
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course ID already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// الحصول على جميع الدورات
export const getCourses = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      type, 
      categoryId, 
      teacherId,
      search 
    } = req.query;
    
    const query = { isActive: true };
    
    // تطبيق الفلاتر
    if (status) query.status = status;
    if (type) query.type = type;
    if (categoryId) query.categoryId = categoryId;
    if (teacherId) query.teacher = teacherId;
    
    // تطبيق البحث
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleEn: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { descriptionEn: { $regex: search, $options: 'i' } }
      ];
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: ['teacher', 'categoryId'],
      sort: { createdAt: -1 }
    };
    
    const courses = await Course.find(query)
      .populate('teacher', 'name nameEn title')
      .populate('categoryId', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Course.countDocuments(query);
    
    res.json({
      success: true,
      data: courses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// الحصول على دورة بواسطة ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .populate('teacher')
      .populate('categoryId');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// الحصول على دورة بواسطة courseId المخصص
export const getCourseByCustomId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ id: courseId })
      .populate('teacher')
      .populate('categoryId');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// تحديث دورة
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // التحقق من وجود المعلم إذا تم تحديثه
    if (updateData.teacher) {
      const teacher = await Teacher.findById(updateData.teacher);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found'
        });
      }
    }
    
    // التحقق من وجود الفئة إذا تم تحديثها
    if (updateData.categoryId) {
      const category = await Category.findById(updateData.categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
    }
    
    const course = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('teacher').populate('categoryId');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// حذف دورة (Soft Delete)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// تسجيل طالب في دورة
export const enrollStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    if (course.enrollStudent()) {
      await course.save();
      res.json({
        success: true,
        message: 'Student enrolled successfully',
        data: course
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'No available seats in this course'
      });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// إلغاء تسجيل طالب من دورة
export const unenrollStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    if (course.unenrollStudent()) {
      await course.save();
      res.json({
        success: true,
        message: 'Student unenrolled successfully',
        data: course
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'No students to unenroll'
      });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// تحديث تقييم الدورة
export const updateCourseRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, oldRating } = req.body;
    
    if (rating < 0 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 5'
      });
    }
    
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const newRating = course.updateRating(rating, oldRating);
    await course.save();
    
    res.json({
      success: true,
      message: 'Course rating updated successfully',
      data: {
        rating: newRating,
        reviews: course.reviews
      }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// الحصول على دورات المعلم
export const getTeacherCourses = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { teacher: teacherId, isActive: true };
    if (status) query.status = status;
    
    const courses = await Course.find(query)
      .populate('categoryId', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Course.countDocuments(query);
    
    res.json({
      success: true,
      data: courses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid teacher ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// الحصول على دورات الفئة
export const getCategoryCourses = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { categoryId, isActive: true };
    if (status) query.status = status;
    
    const courses = await Course.find(query)
      .populate('teacher', 'name nameEn title')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Course.countDocuments(query);
    
    res.json({
      success: true,
      data: courses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};