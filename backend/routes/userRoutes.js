import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
} from '../controllers/userController.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login
router.post('/login', authUser);

// Logout
router.post('/logout', logoutUser);

export default router;
