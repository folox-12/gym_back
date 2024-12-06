import { Router } from "express";
import BodyPartsController from "../controllers/BodyPartsController.js";
import { check } from "express-validator"

const bodyPartsRouter = new Router();

bodyPartsRouter.get('/bodyparts', BodyPartsController.getAllCategories);
bodyPartsRouter.get(
                        '/bodyparts/:id', 
                        [
                            check('id', 'Отсутвует id').notEmpty(),
                        ],
                        BodyPartsController.getCurrentCategory,
                    );

export default bodyPartsRouter;
