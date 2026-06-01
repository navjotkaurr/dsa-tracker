import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login
router.post('/login', authUser);

// Logout
router.post('/logout', logoutUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile)

export default router;
