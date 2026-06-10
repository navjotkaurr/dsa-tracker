import express from "express";
import {
    createTopic,
    deleteTopic,
    getAllTopics,
} from '../controllers/topicController.js'
import { admin, protect } from "../middleware/authMiddleware.js";
import { addProblem, getTopicProblems } from "../controllers/problemController.js";
import { createTopicSchema } from "../validators/topicValidator.js";
import validate from "../middleware/validate.js";
import { addProblemSchema } from "../validators/problemValidator.js";
import cache from "../middleware/cache.js";

const router = express.Router();

//Admin only - create new topic
router.post('/', protect, admin, validate(createTopicSchema) ,createTopic)

// Get all topics
router.get('/', cache(3600), getAllTopics);

router.delete('/:topicId', protect, admin, deleteTopic);

router.get('/:topicId/problems',  cache(1800), getTopicProblems);

router.post('/:topicId/problems', protect, admin, validate(addProblemSchema), addProblem);


export default router;