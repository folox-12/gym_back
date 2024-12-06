import * as dotenv from 'dotenv'
dotenv.config()

import { validationResult } from 'express-validator'

import UserService from '../service/UserService.js'
import ActivitiesService from '../service/ActivitiesService.js'
import ActivitiesFormService from '../service/ActivitiesFormService.js'
import ActivitesComplexModel from '../models/ActivitesComplexModel.js'
import ActivitiesComplexService from '../service/ActivitiesComplexService.js'
import subsriptionComplexesListsModel from '../models/subsriptionComplexesListsModel.js'
import CurrentTraningModel from '../models/CurrentTraningModel.js'
import UserModel from '../models/UserModel.js'

import ApiError from '../excepctions/api-erros.js'

class testController {
    async test(req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
        }

        try {
            const { id } = req.body
            //   const result = await ActivitiesComplexService.getMainActivitiesComplexNotLoggedInUser(id);
            // const result = await subsriptionComplexesListsModel.findAll();
            const result = await UserModel.scope(
                'withoutUserInformation'
            ).findAll({
                include: [
                    {
                        association: 'user_tranings',
                        exclude: ['id_user'],
                        include: [
                            {
                                association: 'activities',
                            },
                        ],
                    },
                ],
            })
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
    async testDel(req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
        }

        try {
            const { id } = req.body
            const result =
                await ActivitiesComplexService.deleteActivitiesComplex(id)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

export default new testController()
