import express from 'express';
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
router.get('/admin/contacts', getContacts);
router.get('/admin/contacts/:id', getContact);
router.patch('/admin/contacts/:id/status', updateContactStatus);
router.delete('/admin/contacts/:id', deleteContact);

export default router;