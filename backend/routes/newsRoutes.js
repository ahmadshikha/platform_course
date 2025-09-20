import express from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  searchNews,
  getNewsByCategory,
  getFeaturedNews
} from '../controllers/newsController.js';
import { _protect } from '../middlewares/authMiddleware.js';
import upload, {singleImageUpload} from '../middlewares/upload.js';

const router = express.Router();

// GET /api/news - Get all news with optional filtering
router.get('/', getAllNews);

// GET /api/news/featured - Get featured news
router.get('/featured', getFeaturedNews);

// GET /api/news/search - Search news articles
router.get('/search', searchNews);

// GET /api/news/category/:category - Get news by category
router.get('/category/:category', getNewsByCategory);

// GET /api/news/:id - Get single news article
router.get('/:id', getNewsById);

// POST /api/news - Create new news article
router.post('/', _protect, singleImageUpload, createNews);

// PUT /api/news/:id - Update news article
router.put('/:id', _protect, updateNews);

// DELETE /api/news/:id - Delete news article
router.delete('/:id', _protect, deleteNews);

export default router;