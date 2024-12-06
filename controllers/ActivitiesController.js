
import * as dotenv from 'dotenv'
dotenv.config()
import ApiError from '../excepctions/api-erros.js'
import { validationResult } from 'express-validator'
import ActivitiesService from '../service/ActivitiesService.js'


class ActivitiesController {
    async getAllActivities(req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
        }

        try {
            const result = await ActivitiesService.getAllActivity();

            res.json(result)
        } catch (e) {
            next(e)
        }
    }
    async createNewActivity(req, res, next) {
        try {
            const { activity } = req.body;
            const {dataValues: { id_activity }}= await ActivitiesService.creaeteNewActivity(activity);
            return res.json(id_activity);
        }catch(e){
            next(e)
        }
    }
}

export default new ActivitiesController()
