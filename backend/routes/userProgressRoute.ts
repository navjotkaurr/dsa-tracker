import express from "express";
import { getMyProgress, markComplete } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', protect, getMyProgress);

router.patch('/:problemId', protect, markComplete);

export default router;