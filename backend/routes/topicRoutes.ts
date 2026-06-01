import express from "express";
import {
    createTopic,
    deleteTopic,
    getAllTopics,
} from '../controllers/topicController.js'
import { admin, protect } from "../middleware/authMiddleware.js";
import { addProblem, getTopicProblems } from "../controllers/problemController.js";

const router = express.Router();

//Admin only - create new topic
router.post('/', protect, admin, createTopic)

// Get all topics
router.get('/', getAllTopics);

router.delete('/:topicId', protect, admin, deleteTopic);

router.get('/:topicId/problems',  protect, getTopicProblems);
router.post('/:topicId/problems', protect, admin, addProblem);


export default router;