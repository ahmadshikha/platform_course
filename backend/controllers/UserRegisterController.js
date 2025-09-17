// controllers/userRegisterController.js
import UserRegister from "../models/UserRegister.js";

// Create new registration
export const createRegistration = async (req, res) => {
  try {
    console.log("Creating new registration");
    console.log(req.body)
    const registration = new UserRegister(req.body);
    await registration.save();
    res.status(201).json({
      success: true,
      message: "تم تسجيل البيانات بنجاح",
      data: registration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.errors
    });
  }
};

// Get all registrations
export const getRegistrations = async (req, res) => {
  try {
    console.log("Fetching all registrations");
    const registrations = await UserRegister.find().sort({ registrationDate: -1 });
    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get registration by ID
export const getRegistrationById = async (req, res) => {
  try {
    console.log("Fetching registration by ID");
    const registration = await UserRegister.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على التسجيل"
      });
    }
    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update registration status
export const updateRegistrationStatus = async (req, res) => {
  try {
    console.log("Updating registration status");
    const { status, notes } = req.body;
    const registration = await UserRegister.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على التسجيل"
      });
    }
    
    res.json({
      success: true,
      message: "تم تحديث حالة التسجيل بنجاح",
      data: registration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get registrations by course
export const getRegistrationsByCourse = async (req, res) => {
  try {
    console.log("Fetching registrations by course");
    const { courseNumber } = req.params;
    const registrations = await UserRegister.find({ courseNumber }).sort({ registrationDate: -1 });
    
    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get registrations by status
export const getRegistrationsByStatus = async (req, res) => {
  try {
    console.log("Fetching registrations by status");
    const { status } = req.params;
    const registrations = await UserRegister.find({ status }).sort({ registrationDate: -1 });
    
    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete registration
export const deleteRegistration = async (req, res) => {
  try {
    console.log("Deleting registration");
    const registration = await UserRegister.findByIdAndDelete(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على التسجيل"
      });
    }
    
    res.json({
      success: true,
      message: "تم حذف التسجيل بنجاح"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};