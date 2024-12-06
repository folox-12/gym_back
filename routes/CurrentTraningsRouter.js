import { Router } from 'express'
import CurrentTraningsControllers from '../controllers/CurrentTraningsControllers.js'
import { check } from 'express-validator'
import authMiddleware from '../middleware/auth-middleware.js'

export const CurrentTraningRouter = new Router()

CurrentTraningRouter.get(
    '/profile/:date',
    authMiddleware,
    [check('date', 'Отсутвует дата').isDate()],
    CurrentTraningsControllers.getAllCurrentTraning,
)

CurrentTraningRouter.post(
    '/profile/',
    authMiddleware,
    CurrentTraningsControllers.updateCurrentTraning,
)

export default CurrentTraningRouter
