import { Router } from 'express'
import { check } from 'express-validator'
import authMiddleware from '../middleware/auth-middleware.js'
import SubsriptionComplexesListsController from '../controllers/SubsriptionComplexesListsController.js'

const SubsriptionRouter = new Router()

SubsriptionRouter.post(
    '/subscription/:id',
    authMiddleware,
    [check('id', 'Неправильно введены данные').notEmpty()],
    SubsriptionComplexesListsController.subscribeToComplex
)

SubsriptionRouter.delete(
    '/subscription/:id',
    authMiddleware,
    [check('id', 'Неправильно введены данные').notEmpty()],
    SubsriptionComplexesListsController.unSubscribeToComplex
)

SubsriptionRouter.get(
    '/my-subscription/',
    authMiddleware,
    SubsriptionComplexesListsController.getMySubsriptionList
)

SubsriptionRouter.get(
    '/subscription/ids',
    authMiddleware,
    SubsriptionComplexesListsController.getSubscribedComplexesId
)

SubsriptionRouter.get(
    '/profile/subscription',
    authMiddleware,
    SubsriptionComplexesListsController.getMySubsriptionList
)
export default SubsriptionRouter
