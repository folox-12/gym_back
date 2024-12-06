import * as dotenv from 'dotenv';
dotenv.config();
import bodyPartModel from '../models/BodyPartModel.js'
import ApiError from '../excepctions/api-erros.js';

class BodyPartsService {
    async getAllBodyParts() {
       const allCategories = await bodyPartModel.findAll();
       return allCategories;
    }

    async getCurrentBodyParts(id) {
        const currentBodyParts = await bodyPartModel.findOne({
            where: { 'id_body_part': id }
        })

        if (!currentBodyParts) {
                throw ApiError.BadRequest("Неверно указана часть тела");
        }
        return currentBodyParts;
    }
}

export default new BodyPartsService;