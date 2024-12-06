import ApiError from '../excepctions/api-erros.js'
import BodyPartsService from '../service/BodyPartsService.js'
import { validationResult } from "express-validator"

class bodyPartsContoller  {
    async getAllCategories(req, res, next) {
        try{
            const allCategories = await BodyPartsService.getAllBodyParts();
            return res.json(allCategories)

        }catch(e){
            next(e);
        }
    }

    async getCurrentCategory(req, res, next) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }

            let { id } = req.params;
            id = Number(id);

            const result = await BodyPartsService.getCurrentBodyParts(id);
            return res.json(result);
    }
}
export default new bodyPartsContoller;