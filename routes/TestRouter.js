import { Router } from "express";
import TestController from "../controllers/TestController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/auth-middleware.js";

export const TestRouter = new Router();

TestRouter.get("/test", TestController.test);
TestRouter.delete("/test", TestController.testDel);

export default TestRouter;
