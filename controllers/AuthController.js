import * as dotenv from 'dotenv'
dotenv.config()

import { validationResult } from "express-validator"
import UserService from '../service/UserService.js';
import ApiError from '../excepctions/api-erros.js'

class authController{

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }

            const { email, password } = req.body;

            const token = await UserService.login(email, password);
            return res.json(token)
            
        }
        catch(e) {
            next(e)
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }
            const { email, password } = req.body

            const response = await UserService.registration(email, password);
            return res.json(response)
        }
        catch(e) {
            next(e)
        }
    }

    async logout(req, res) {
        res.status(200).json({ status: 1, message: "Вы вышли из аккаунта", token: "" });
    }

    async getUsers(req, res, next) {
        try {
            const token = req.headers["authorization"];
            const newtoken = token.replace("Bearer ", "");
            if (token) {
                const userInfo = await UserService.getUserInfoFromToken(newtoken)
                res.json(userInfo);

            } else {
                return next(ApiError.UnauthorizedError());
            }
        }
        catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
            try {
                const activationLink = req.params.link;
                await UserService.activate(activationLink);

                return res.redirect(`${process.env.CLIENT_URL}/auth`);

            } catch (e) {
                next(e);
            }
    }
}

export default new authController;