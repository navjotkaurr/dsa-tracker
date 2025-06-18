import express from "express";
import {
    createTopic,
    getAllTopic,
    markProblemComplete,
} from '../controllers/topicController.js'
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Admin only - create new topic
router.post('/', protect, admin, createTopic)

// Get all topics
router.get('/', getAllTopic);

// Toggle a problem's status
router.patch('/problem/:id', protect, markProblemComplete);

export default router;