import ApiError from '../excepctions/api-erros.js'
import ActivitiesComplexService from './ActivitiesComplexService.js'
import models from '../models/index.js'
import UserService from './UserService.js'

class SubsriptionComplexesLists {
    async isComplexInSubscriptionList(id_user, id_activities_complex) {
        const result = await models.subscription.findOne({
            where: {
                id_user,
                id_activities_complex,
            },
        })
        return result
    }

    async subsribeToComplex(id_user, id_activities_complex) {
        const validataeId = await ActivitiesComplexService.checkOnExistsComplex(
            id_activities_complex
        )

        if (!validataeId) {
            throw ApiError.BadRequest('Данного комплекса не существует')
        }

        if (
            await this.isComplexInSubscriptionList(
                id_user,
                id_activities_complex
            )
        ) {
            throw ApiError.BadRequest('На данный комплекс вы уже подписаны')
        }

        return await models.subscription.create({
            id_activities_complex,
            id_user,
        })
    }

    async deleteSubsribeToComplex(id_user, id_activities_complex) {
        const validataefields =
            (await ActivitiesComplexService.checkOnExistsComplex(
                id_activities_complex
            )) &&
            (await this.isComplexInSubscriptionList(
                id_user,
                id_activities_complex
            ))
        if (!validataefields) {
            throw ApiError.BadRequest('Данного комплекса не существует')
        }

        return await models.subscription.destroy({
            where: {
                id_activities_complex,
                id_user,
            },
        })
    }

    async getSubscribedComplexesId(id) {
        return await UserService.getSubscription(id);
    }

    async getUserSubscribtion(id) {
        return await UserService.getSubscription(id);
    }

    async getAllComplexActivitiesComplexes(id_user) {
        return await models.user.findOne({
            where: {
                id: id_user,
            },
            attributes: [],
            include: [
                {
                    association: 'subscription',
                    through: { attributes: [] },
                    exclude: ['id_author'],

                    include: [
                                        {
                    association: 'author',
                },
                {
                    association: 'activities',
                    scope: 'withoutFormInformation',
                    through: {attributes: []},

                    attributes: {
                        exclude: ['id_difficulty', 'id_body_part']
                    },

                    include: [
                        {
                            association: 'bodypart',
                        },
                        {
                            association: 'difficulty',
                        }
                    ]
                },

                    ]
                },
            ],
        })
    }
}

export default new SubsriptionComplexesLists()
