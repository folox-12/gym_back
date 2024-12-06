import authController from "../controllers/AuthController.js";
import { Router } from "express";
import { check } from "express-validator"

const AuthRouter = new Router();

AuthRouter.post('/auth/login',
                    [
                        check('email', 'Некорректно заполнена почта').isEmail(),
                        check('password', 'Не заполнен пароль').notEmpty(),
                    ],
                    authController.login
                )
AuthRouter.post('/auth/registration',
                    [
                        check('password', 'Не заполнен пароль').notEmpty(),
                        check('email', 'Не заполненa почта').isEmail(),
                    ],
                    authController.registration
                    )

AuthRouter.get('/auth/user', authController.getUsers);
AuthRouter.get('/auth/activate/:link', authController.activate);
AuthRouter.post('/auth/logout', authController.logout);


export default AuthRouter;
