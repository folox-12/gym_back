import { validationResult } from 'express-validator'
import ApiError from '../excepctions/api-erros.js'
import UserService from '../service/UserService.js'

class UserController {
    async getMainInfo(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }

            const {id} = req.user.user;
            const currentUser = await UserService.getProfileInfo(id)

            res.json(currentUser);

        } catch(e) {
            next(e)
        }
    }
    async updateName(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }

            const {id} = req.user.user;
            const form = req.body;
            const updated = await UserService.updateProfileInfo(id, form)

            res.json(updated);

        } catch(e) {
            next(e)
        }
    }
}
export default new UserController;
