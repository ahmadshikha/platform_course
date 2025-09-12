// controllers/categoryController.js
import Category from '../models/Category.js';

// إنشاء فئة جديدة
export const createCategory = async (req, res) => {
  try {
    console.log("test");
    
    const { name, description } = req.body;
    
    // التحقق من وجود الفئة مسبقاً
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'اسم الفئة موجود مسبقاً'
      });
    }
    
    const category = new Category({ name, description });
    await category.save();
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الفئة بنجاح',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// الحصول على جميع الفئات
export const getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, active } = req.query;
    const query = {};
    
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    const categories = await Category.find(query)
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Category.countDocuments(query);
    
    res.json({
      success: true,
      data: categories,
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

// الحصول على فئة بواسطة ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'الفئة غير موجودة'
      });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'معرف الفئة غير صالح'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// تحديث فئة
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, isActive },
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'الفئة غير موجودة'
      });
    }
    
    res.json({
      success: true,
      message: 'تم تحديث الفئة بنجاح',
      data: category
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'اسم الفئة موجود مسبقاً'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// حذف فئة
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'الفئة غير موجودة'
      });
    }
    
    res.json({
      success: true,
      message: 'تم حذف الفئة بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// البحث في الفئات
export const searchCategories = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'يجب تقديم مصطلح البحث'
      });
    }
    
    const categories = await Category.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }).sort({ name: 1 });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};