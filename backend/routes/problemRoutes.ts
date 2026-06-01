import { deleteProblem, updateProblem } from "../controllers/problemController.js";
import { admin, protect } from '../middleware/authMiddleware.js';
import express  from "express";

const router = express.Router();


router.put('/:problemId', protect, admin, updateProblem);

router.delete('/:problemId', protect, admin, deleteProblem)

export default router;