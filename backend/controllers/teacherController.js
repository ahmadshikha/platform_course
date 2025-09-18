// controllers/teacherController.js
import Teacher from "../models/Teacher.js";
import Course from "../models/Course.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    const query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const teachers = await Teacher.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Teacher.countDocuments(query);

    res.status(200).json({
      teachers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new teacher
// export const createTeacher = async (req, res) => {
//   try {
//     const teacher = new Teacher(req.body);
//     const savedTeacher = await teacher.save();
//     res.status(201).json(savedTeacher);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Update teacher
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete teacher (soft delete)
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search teachers
export const searchTeachers = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    
    const searchQuery = {
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { nameEn: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { titleEn: { $regex: query, $options: 'i' } },
        { specialties: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    const teachers = await Teacher.find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1, createdAt: -1 });

    const total = await Teacher.countDocuments(searchQuery);

    res.status(200).json({
      teachers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacherWithCourses = async (req, res) => {
  try {
    const { id } = req.params;

    // البحث عن الأستاذ مع الكورسات المرتبطة به
    const teacher = await Teacher.findById(id);
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الأستاذ'
      });
    }

    // البحث عن جميع كورسات هذا الأستاذ
    const courses = await Course.find({ teacher: id })
      .select('-teacher') // استبعاد حقل teacher لتجنب التكرار
      .sort({ createdAt: -1 }); // ترتيب من الأحدث إلى الأقدم

    // تحديث عدد الكورسات في بيانات الأستاذ
    teacher.course = courses.length;
    
    // إرجاع البيانات مع الكورسات
    res.status(200).json({
      success: true,
      data: {
        teacher: {
          _id: teacher._id,
          name: teacher.name,
          title: teacher.title,
          image: teacher.image,
          bio: teacher.bio,
          rating: teacher.rating,
          review: teacher.review,
          students: teacher.students,
          course: teacher.course,
          specialties: teacher.specialties,
          education: teacher.education,
          contact: teacher.contact,
          social: teacher.social,
          isActive: teacher.isActive,
          createdAt: teacher.createdAt,
          updatedAt: teacher.updatedAt
        },
        courses: courses
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم',
      error: error.message
    });
  }
};


export const createTeacher = async (req, res) => {
  try {
    const teacherData = { ...req.body };
    // إذا كانت هناك صورة مرفوعة
    if (req.file) {
      teacherData.image = `/uploads/${req.file.filename}`;
    }
    if(teacherData.social) {
      teacherData.social = JSON.parse(teacherData.social);
    }
    if(teacherData.contact) {
      teacherData.contact = JSON.parse(teacherData.contact);
    }
    if(teacherData.education) {
      teacherData.education = JSON.parse(teacherData.education);
    }
    console.log("create teacher", teacherData)

    const teacher = new Teacher(teacherData);
    const savedTeacher = await teacher.save();
    
    res.status(201).json({
      success: true,
      data: savedTeacher,
      message: 'Teacher created successfully'
    });
  } catch (error) {
    // حذف الصورة إذا كان هناك خطأ
    console.log("create teacher", error)
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating teacher',
      error: error.message
    });
  }
};
