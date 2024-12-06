import * as dotenv from 'dotenv'
dotenv.config()

import ApiError from '../excepctions/api-erros.js'
import DifficultyService from '../service/DifficultyService.js';

class DifficultyController {
    async getAllDifficultyCategories(req, res, next) {
        try {
            const allCategories = await DifficultyService.getAllDifficulties();

            return res.json(allCategories);
        } catch (err) {
            next(e)
        }
    }
}

export default new DifficultyController;