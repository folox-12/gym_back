import { Router } from 'express'
import ActivitiesComplexController from '../controllers/ActivitiesComplexController.js'
import { check } from 'express-validator'
import authMiddleware from '../middleware/auth-middleware.js'
import isActivatedMiddleware from '../middleware/is-activated-middleware.js'
import filtersMiddleware from '../middleware/filters-middleware.js'
import userMiddleware from '../middleware/user-middleware.js'

export const ActivitiesComplexRouter = new Router()

ActivitiesComplexRouter.get(
    '/activities-complex',
    filtersMiddleware,
    userMiddleware,
    ActivitiesComplexController.getMainActivities
)

ActivitiesComplexRouter.get(
    '/activities-complex/:id',
    [check('id', 'Не существует выбранной программы').notEmpty()],
    ActivitiesComplexController.getCurrentActivity
)

ActivitiesComplexRouter.get(
    '/is-user-author-complex/:id',
    [check('id', 'Не существует выбранной программы').notEmpty()],
    authMiddleware,
    ActivitiesComplexController.isUserAuthor
)

ActivitiesComplexRouter.post(
    '/activities-complex/',
    authMiddleware,
    ActivitiesComplexController.updateComplexForm
)

ActivitiesComplexRouter.post(
    '/activities-complex/new/',
    authMiddleware,
    isActivatedMiddleware,
    ActivitiesComplexController.createComplexForm
)

ActivitiesComplexRouter.delete(
    '/activities-complex/:id',
    [check('id', 'Не выбрана программа').notEmpty()],
    authMiddleware,
    ActivitiesComplexController.deleteActivityComplex
)

export default ActivitiesComplexRouter
