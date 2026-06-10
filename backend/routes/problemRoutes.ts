import { deleteProblem, updateProblem } from "../controllers/problemController.js";
import { admin, protect } from '../middleware/authMiddleware.js';
import express  from "express";
import validate from "../middleware/validate.js";
import { updateProblemSchema } from "../validators/problemValidator.js";

const router = express.Router();


router.put('/:problemId', protect, admin, validate(updateProblemSchema) ,updateProblem);

router.delete('/:problemId', protect, admin, deleteProblem)

export default router;