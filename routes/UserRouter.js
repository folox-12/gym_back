import { Router } from "express";
import authMiddleware from '../middleware/auth-middleware.js'
import UserController from "../controllers/UserController.js";

const UserRouter = new Router();

UserRouter.get('/profile/', authMiddleware, UserController.getMainInfo,)
UserRouter.post('/profile/name/', authMiddleware, UserController.updateName,)

export default UserRouter;
