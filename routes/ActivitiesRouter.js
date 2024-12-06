
import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware.js"
import ActivitiesController from "../controllers/ActivitiesController.js";

const ActivitiesRouter= new Router();


ActivitiesRouter.get('/activities', authMiddleware, ActivitiesController.getAllActivities)

ActivitiesRouter.post('/activities/new/', authMiddleware, ActivitiesController.createNewActivity)


export default ActivitiesRouter;
