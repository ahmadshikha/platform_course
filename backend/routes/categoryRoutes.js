import express from 'express';
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
router.post('/', singleImageUpload, createCategory);
router.get('/', getCategories);
router.get('/search', searchCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;