import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import DifficultyController from "../controllers/DifficultyController.js";

const DifficultyRouter = new Router();

DifficultyRouter.get(
                    '/difficulty', 
                    authMiddleware,
                    DifficultyController.getAllDifficultyCategories,
                )

export default DifficultyRouter;
