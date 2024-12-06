import ApiError from '../excepctions/api-erros.js';
import ActivityModel from '../models/ActivityModel.js';
import models from '../models/index.js';

import BodyPartsService from './BodyPartsService.js';
import DifficultyService from './DifficultyService.js';

class ActiviesService {
    async getAllActivity(){
        return await models.activity.findAll({
            include: [
                {association: 'bodypart'},
                {association: 'difficulty'}
            ]
        })
    }

    async checkValidProperty(id_difficulty, id_body_part) {
        if (!id_difficulty || !id_body_part) {
            return false
        };
        const isValidBodyPartId = await BodyPartsService.getCurrentBodyParts(id_body_part);
        const isValidDifficultyId = await DifficultyService.getCurrentDifficulty(id_difficulty);
        const isValid = !!isValidBodyPartId && !!isValidDifficultyId

        if(!isValid) throw ApiError.BadRequest("Ошибка при создании")

    }

    async deleteOldActivity(id_activity){
        const currentActivity = await models.activity.findOne({
            where: {id_activity}
        })

        if(!currentActivity) {
            throw ApiError.BadRequest("Такого упражнения не существует")
        }

        return await ActivityModel.destroy({
            where: { id_activity },
        })
    }

    async creaeteNewActivity({ kilocalories, name, id_difficulty, id_body_part }){
        await this.checkValidProperty(id_difficulty, id_body_part);

        const isActivityExist = await models.activity.findOne({
            where: {
                name,
            }
        })
        if(isActivityExist) throw ApiError.BadRequest("Упражнение с таким именем уже существует")

        return await models.activity.create({
            kilocalories,
            name,
            id_difficulty,
            id_body_part,
        })
    }
}

export default new ActiviesService;
