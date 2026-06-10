import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadProfilePic,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import validate from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../validators/userValidator.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Register a new user
router.post('/register', validate(registerSchema), registerUser);

// Login
router.post('/login', loginLimiter, validate(loginSchema) , authUser);

// Logout
router.post('/logout', logoutUser);

router.post('/profile/upload', protect, upload.single('image'), uploadProfilePic);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile)

export default router;
