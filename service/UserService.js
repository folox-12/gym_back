import * as dotenv from 'dotenv'
dotenv.config()
import bcryptjs from 'bcryptjs'
import { v4 } from 'uuid'

import user from '../models/UserModel.js'

import mailService from './MailService.js'
import tokenService from './TokenService.js'
import ApiError from '../excepctions/api-erros.js'

import UserDto from '../dto/UserDto.js'
import models from '../models/index.js'

class UserService {
    async registration(email, password) {
        const candidate = await user
            .scope('loginScope')
            .findOne({ where: { email } })

        if (candidate) {
            throw ApiError.BadRequest(
                `Пользователь с таким адресом ${email} уже существует`
            )
        }

        const hashPassword = bcryptjs.hashSync(String(password), 7)
        const activationLink = v4()

        await user.create({
            email,
            password: hashPassword,
            activation_link: activationLink,
        })

        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/auth/activate/${activationLink}`
        )
        return `Пользователь успешно зарегистрирован </br>
                Чтобы получить все возможности сайта активируйте аккаунт по почте
                `
    }

    async login(email, password, fromEmail = false) {
        const findedUser = await models.user.scope('loginScope').findOne({
            where: { email },
        })
        if (!findedUser) {
            throw ApiError.BadRequest('Пользователь с такой почтой не найден')
        }

        const validatePassword = fromEmail
            ? password === findedUser.password
            : bcryptjs.compareSync(String(password), findedUser.password)

        if (!validatePassword) {
            throw ApiError.BadRequest('Введен неправильный пароль')
        }
        const userDto = new UserDto(findedUser)

        const token = tokenService.generateAccessToken({ ...userDto })

        return { token }
    }

    async activate(activationLink) {
        const findedUser = await user
            .scope('loginScope')
            .findOne({ where: { activation_link: activationLink } })

        if (!findedUser) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        if (!findedUser['is_activated']) {
            await findedUser.update({ is_activated: 1 })
        }
    }

    async getUserInfoFromToken(token) {
        if (!token) {
            throw ApiError.BadRequest('Невалидный токен')
        }
        const validateUser = tokenService.validateAccessToken(token)
        if (!validateUser) {
            throw ApiError.UnauthorizedError()
        }

        return validateUser
    }

    async getSubscription(id) {
        const { subscription }= await models.user.findOne({
            where: {
                id,
            },
            attributes: [],
            include: [
                {
                    association: 'subscription',
                    scope: 'onlyIds',
                    through: { attributes: [] },
                    exclude: ['id_author'],
                    row: true,
                },
            ],

        })
        return subscription;
    }

    async getUsersCurrentTranings(id) {
        return await UserModel.scope('withoutUserInformation').findAll({
            where: {
                id,
            },
            include: [
                {
                    association: 'user_tranings',
                    exclude: ['id_user'],
                    include: [
                        {
                            association: 'activities',
                        },
                    ],
                },
            ],
        })
    }

    async getProfileInfo(id) {
        return await models.user.findOne({
            where: {
                id,
            }
        })
    }
    async updateProfileInfo(id, form) {
        const user = await models.user.findOne({
            where: {
                id,
            }
        })

        const updated = await user.update({
            name: form.name,
            surname: form.surname,
        })

        return !!updated;
    }
}

export default new UserService()
