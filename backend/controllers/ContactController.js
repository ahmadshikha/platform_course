import Contact from '../models/Contact.js';

// إنشاء رسالة اتصال جديدة
export const createContact = async (req, res) => {
  try {
    console.log(req.body);
    
    const { username, email, message } = req.body;
    
    // الحصول على معلومات إضافية عن الطلب
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    const newContact = new Contact({
      username,
      email,
      message,
      ipAddress,
      userAgent
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً',
      data: savedContact
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'خطأ في التحقق من البيانات',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم',
      error: error.message
    });
  }
};

// الحصول على جميع رسائل الاتصال (للوحة التحكم)
export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
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

// الحصول على رسالة اتصال محددة
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الرسالة'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'معرف غير صالح'
      });
    }

    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم',
      error: error.message
    });
  }
};

// تحديث حالة الرسالة
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الرسالة'
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم تحديث حالة الرسالة',
      data: contact
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'معرف غير صالح'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'خطأ في التحقق من البيانات',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم',
      error: error.message
    });
  }
};

// حذف رسالة اتصال
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الرسالة'
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم حذف الرسالة بنجاح'
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'معرف غير صالح'
      });
    }

    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم',
      error: error.message
    });
  }
};