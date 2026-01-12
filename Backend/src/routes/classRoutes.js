import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from '../controllers/classController.js';

const router = express.Router();

/* 🌍 PUBLIC ROUTES */
router.get('/', getClasses);
router.get('/:id', getClassById);

/* 🔐 PROTECTED ROUTES */
router.post('/', protect, adminOnly, createClass);
router.put('/:id', protect, adminOnly, updateClass);
router.delete('/:id', protect, adminOnly, deleteClass);

export default router;
