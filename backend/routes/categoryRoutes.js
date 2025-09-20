import express from 'express';
import {_protect} from "../middlewares/authMiddleware.js"
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  searchCategories
} from '../controllers/CategoryController.js';
import upload, {singleImageUpload} from '../middlewares/upload.js';

const router = express.Router();

// router.post('/', upload.single('image'), createCategory);
router.post('/', _protect,singleImageUpload, createCategory);
router.get('/', getCategories);
router.get('/search', searchCategories);
router.get('/:id', getCategoryById);
router.put('/:id', _protect,updateCategory);
router.delete('/:id', _protect,deleteCategory);

export default router;