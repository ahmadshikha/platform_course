import express from 'express';
import { _protect } from '../middlewares/authMiddleware.js';
import {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact
} from '../controllers/ContactController.js';

const router = express.Router();

// routes للعامة
router.post('/', createContact);

// routes للادمن (يمكن إضافة middleware للتحقق من الصلاحيات)
router.get('/', _protect, getContacts);
router.get('/admin/contacts/:id', getContact);
router.patch('/admin/contacts/:id/status', _protect, updateContactStatus);
router.delete('/admin/contacts/:id', _protect, deleteContact);

export default router;