import traningsController from "../controllers/TraningsController.js";

import { Router } from "express";
import { check } from "express-validator"
import authMiddleware from "../middleware/auth-middleware.js"

const TraningsRouter = new Router();


TraningsRouter.get('/tranings', authMiddleware, traningsController.allTranings)


export default TraningsRouter;