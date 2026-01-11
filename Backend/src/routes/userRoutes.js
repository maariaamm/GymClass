import express from 'express';
import multer from 'multer';
import {
  register,
  login,
  getMe,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profileImages/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

/* Public routes */
router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);

/* Protected routes */
router.use(protect);
router.get('/me', getMe);
router.get('/', adminOnly, getAllUsers);
router.put('/:id', upload.single('profileImage'), updateUser);
router.delete('/:id', adminOnly, deleteUser);

export default router;
