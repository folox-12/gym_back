import * as dotenv from 'dotenv';
dotenv.config();
import ApiError from '../excepctions/api-erros.js';
import DifficultyModel from '../models/DifficultyModel.js';

class DifficultyService {
    async getCurrentDifficulty(id) {
        const currentDifficulty = await DifficultyModel.findOne({
            where: { id }
        })

        if (!currentDifficulty) {
                throw ApiError.BadRequest("Не найдена выбранная сложность");
        }
        return currentDifficulty;
    }

    async getAllDifficulties(id) {
        const allDifficulties = await DifficultyModel.findAll()

        if (!allDifficulties) {
                throw ApiError.BadRequest("Сложностей не найдено");
        }

        return allDifficulties;
    }
}

export default new DifficultyService;