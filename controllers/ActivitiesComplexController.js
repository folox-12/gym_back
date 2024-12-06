import ActivitiesComplexService from '../service/ActivitiesComplexService.js'
import { validationResult } from 'express-validator'
import ApiError from '../excepctions/api-erros.js'

class ActivitiesComplex {
    async getCurrentActivity(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const { id } = req.params
            const data = await ActivitiesComplexService.getCurrentActivity(id)
            res.json(data)

        } catch (e) {
            next(e)
        }
    }

    async getMainActivities(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const filters = req.filters;
            let { result, totalCount }= await ActivitiesComplexService.getMainActivitiesComplexNotLoggedInUser(filters);

            res.json({result, totalCount})
        } catch (e) {
            next(e)
        }
    }

    async updateComplexForm(req, res, next) {
        try {
            const { form } = req.body
            const userId = req.user.user.id

            const result = await ActivitiesComplexService.updateComplexForm({form, id: userId});

            res.json(result);
        } catch(e) {
            next(e);
        }
    }

    async createComplexForm(req, res, next) {
        try {
            const { form } = req.body
            const userId = req.user.user.id

            const result = await ActivitiesComplexService.createComplexForm({form, id: userId});

            res.json(result);
        } catch(e) {
            next(e);
        }
    }

    async deleteActivityComplex(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const { id } = req.params
            const userId = req.user.user.id
            const data = await ActivitiesComplexService.deleteActivitiesComplex(userId, id)

            res.json(data)

        } catch (e) {
            next(e)
        }
    }

    async isUserAuthor(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const { id } = req.params
            const userId = req.user.user.id
            const data = await ActivitiesComplexService.isUserAuthor(userId, id)

            res.json(data)

        } catch (e) {
            next(e)
        }
    }
}

export default new ActivitiesComplex()
