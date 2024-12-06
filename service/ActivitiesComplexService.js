import ApiError from '../excepctions/api-erros.js'
import { modules } from '../dbconnection.js'
import models from '../models/index.js'

class ActivitiesComplexService {
    async getDetailedActivitiesComplex() {
        const result = await models.complex.findAll({
            include: [
                {
                    association: 'activities',
                    attributes: {
                        exclude: ['activities_form'],
                    },
                },
                {
                    association: 'author',
                    attributes: {
                        exclude: [
                            'password',
                            'is_activated',
                            'activation_link',
                        ],
                    },
                },
            ],
        })

        return result
    }

    async checkOnExistsComplex(id) {
        const result = await models.complex.findOne({
            where: {
                id_activities_complex: id,
            },
        })

        return result
    }

    async isUserAuthor(idUser, id) {
        const data = await models.complex.findOne({
            where: {
                id_activities_complex: id,
                id_author: idUser,
            },
        })

        return !!data
    }

    async deleteActivitiesComplex(userId, id) {
        const vaildate = await this.checkOnExistsComplex(id)

        if (!vaildate) {
            throw ApiError.BadRequest('Такого комплекса не существует')
        }

        const isAuthor = await this.isUserAuthor(userId, id)
        if (!isAuthor) {
            throw ApiError.BadRequest('Данный пользователь не является автором')
        }


        const result = await Promise.all([
            models.activitiesForm.destroy({
                where: {
                    id_activities_complex: id,
                },
            }),

            models.complex.destroy({
                where: {
                    id_activities_complex: id,
                    id_author: userId,
                },
            })
        ])

        return !!result;
    }

    async getCurrentActivity(id) {
        const result = await models.complex.findOne({
            where: {
                id_activities_complex: id,
            },

            include: [
                {
                    association: 'author',
                },
                {
                    association: 'activities',
                    scope: 'withoutFormInformation',
                    through: { attributes: [] },

                    attributes: {
                        exclude: ['id_difficulty', 'id_body_part'],
                    },

                    include: [
                        {
                            association: 'bodypart',
                        },
                        {
                            association: 'difficulty',
                        },
                    ],
                },
            ],
        })

        return result
    }

    async updateComplexForm({ form, id }) {
        if (form.id_author !== id) {
            throw ApiError.BadRequest('Данный пользователь не является автором')
        }
        const bulkedActivities = form.activities.map((el) => ({
            id_activity: el.id_activity,
            id_activities_complex: form.id_activities_complex,
        }))
        const result = await models.complex.findOne({
            where: {
                id_activities_complex: form.id_activities_complex,
            },
        })

        const count = await result.update({
            title: form.title,
            description: form.description,
        })

        await Promise.all([
            models.activitiesForm.destroy({
                where: {
                    id_activities_complex: form.id_activities_complex,
                },
            }),
            models.activitiesForm.bulkCreate(bulkedActivities),
        ])

        return !!count;
    }

    async createComplexForm({ form, id }) {
        const { id_activities_complex }= await models.complex.create({
            title: form.title,
            description: form.description,
            date_creation: form.date_creation,
            id_author: id,
        })

        const bulkedActivities = form.activities.map((el) => ({
            id_activity: el.id_activity,
            id_activities_complex,
        }));

        await models.activitiesForm.bulkCreate(bulkedActivities);

        return !!id_activities_complex;
    }

    async getMainActivitiesComplexNotLoggedInUser(filters) {
        const { count } = await models.complex.findAndCountAll({
            where: {
                title: {
                    [modules.Op.substring]: filters.search
                        ? filters.search
                        : '',
                },
            },
            include: [
                {
                    association: 'author',
                },
            ],
        })

        const result = await models.complex.findAll({
            where: {
                title: {
                    [modules.Op.substring]: filters.search
                        ? filters.search
                        : '',
                },
            },
            include: [
                {
                    association: 'author',
                },
            ],

            offset: filters.paggingSize * (filters.pagging - 1),
            limit: filters.paggingSize,
        })

        return { result, totalCount: count }
    }
}

export default new ActivitiesComplexService()
