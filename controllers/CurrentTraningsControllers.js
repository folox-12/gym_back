import { validationResult } from 'express-validator'
import ApiError from '../excepctions/api-erros.js'
import CurrentTraning from '../service/CurrentTraningService.js'

class CurrentTraningsControllers {
    async getCurrentTraning(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const userId = req.user.user.id
            const result = await CurrentTraning.getCurrentTranings(
                userId
            )
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async getAllCurrentTraning(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const userId = req.user.user.id
            const date = req.params.date
            const result =  await CurrentTraning.getAllComplexActivitiesComplexes(
                userId,
                date
            )
            res.json(result)
        } catch (err) {
            next(err)
        }
    }

    async updateCurrentTraning(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const userId = req.user.user.id
            const {form} = req.body;

            const result =  await CurrentTraning.updateOrCreateTraning({form, id_user: userId})
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
}

export default new CurrentTraningsControllers;
