import ApiError from '../excepctions/api-erros.js'
import SubsriptionComplexesListsService from '../service/SubsriptionComplexesListsService.js'
import { validationResult } from 'express-validator'

class SubsriptionComplexesLists {
    async subscribeToComplex(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }
            const userId = req.user.user.id
            const id_activities_complex = Number(req.params.id)

            await SubsriptionComplexesListsService.subsribeToComplex(
                userId,
                id_activities_complex
            )
            res.json(true)
        } catch (err) {
            next(err)
        }
    }

    async unSubscribeToComplex(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }

            const userId = req.user.user.id
            const result =
                await SubsriptionComplexesListsService.deleteSubsribeToComplex(
                    userId,
                    Number(req.params.id)
                )
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async getMySubsriptionList(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }

            const userId = req.user.user.id
            const { subscription }=
                await SubsriptionComplexesListsService.getAllComplexActivitiesComplexes(
                    userId
                )

            res.json(subscription)
        } catch (err) {
            next(err)
        }
    }

    async getSubscribedComplexesId(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }

            const userId = req.user.user.id
            const result =
                await SubsriptionComplexesListsService.getSubscribedComplexesId(
                    userId
                )
            res.json(
                result ? result.map((el) => el['id_activities_complex']) : []
            )
        } catch (err) {
            next(err)
        }
    }
}

export default new SubsriptionComplexesLists()
