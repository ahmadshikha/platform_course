import News from '../models/News.js';

// Get all news articles with optional filtering
export const getAllNews = async (req, res) => {
  try {
    const { 
      category, 
      page = 1, 
      limit = 10, 
      sortBy = 'eventDate', 
      sortOrder = 'desc',
      publishedOnly = true 
    } = req.query;

    // Build filter object
    const filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (publishedOnly === 'true') {
      filter.isPublished = true;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const news = await News.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await News.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: news,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNum,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news articles',
      error: error.message
    });
  }
};

// Get single news article by ID
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).select('-__v');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news article',
      error: error.message
    });
  }
};

// Create new news article
// export const createNews = async (req, res) => {
//   try {
//     const news = new News(req.body);
//     const savedNews = await news.save();
    
//     res.status(201).json({
//       success: true,
//       data: savedNews,
//       message: 'News article created successfully'
//     });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation error',
//         errors: Object.values(error.errors).map(e => e.message)
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: 'Error creating news article',
//       error: error.message
//     });
//   }
// };



export const createNews = async (req, res) => {
  try {
    // إنشاء كائن الخبر مع البيانات من req.body
    console.log(req.body)
    const newsData = { ...req.body };
    newsData.eventDate = new Date(req.body.eventDate)
    // إذا كان هناك ملف مرفوع، إضافة معلومات الصورة
    if (req.file) {
      newsData.imageURL = `/uploads/${req.file.filename}`
  
    }
    console.log(newsData)
    
    const news = new News({...newsData});
    const savedNews = await news.save();
    console.log(news);
    
    res.status(201).json({
      success: true,
      data: savedNews,
      message: 'تم إنشاء الخبر بنجاح'
    });
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'خطأ في التحقق',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    // في حالة وجود خطأ متعلق برفع الملف
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'حجم الملف كبير جداً',
        error: 'الحد الأقصى لحجم الملف هو 5MB'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء الخبر',
      error: error.message
    });
  }
};

// Update news article
export const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.status(200).json({
      success: true,
      data: news,
      message: 'News article updated successfully'
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
      message: 'Error updating news article',
      error: error.message
    });
  }
};

// Delete news article
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'News article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting news article',
      error: error.message
    });
  }
};

// Search news articles
export const searchNews = async (req, res) => {
  try {
    const { q, category, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const filter = {
      $text: { $search: q },
      isPublished: true
    };

    if (category && category !== 'all') {
      filter.category = category;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const news = await News.find(filter)
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await News.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: news,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNum,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching news articles',
      error: error.message
    });
  }
};

// Get news by category
export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const news = await News.find({ 
      category: category.toLowerCase(),
      isPublished: true 
    })
      .sort({ eventDate: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await News.countDocuments({ 
      category: category.toLowerCase(),
      isPublished: true 
    });
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: news,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNum,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news by category',
      error: error.message
    });
  }
};

// Get featured/news articles
export const getFeaturedNews = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const limitNum = parseInt(limit);

    const featuredNews = await News.find({ 
      isPublished: true 
    })
      .sort({ views: -1, eventDate: -1 })
      .limit(limitNum)
      .select('-__v');

    res.status(200).json({
      success: true,
      data: featuredNews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured news',
      error: error.message
    });
  }
};