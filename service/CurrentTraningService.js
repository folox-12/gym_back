import UserService from './UserService.js'
import models from '../models/index.js'
import { modules } from '../dbconnection.js'

class CurrentTraning {
    async getCurrentTranings(id_user) {
        const tranings = await UserService.getCurrentTranings(id_user)
        return tranings
    }

    async getAllComplexActivitiesComplexes(id_user, date) {
        const result = await models.currentTraning.findOne({
            where: {
                date: {
                    [modules.Op.eq]: new Date(date),
                },
            },

            include: [
                {
                    association: 'activitiesForTraning',
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

        return result || null
    }

    async updateOrCreateTraning({form, id_user} ) {
        let idTraning
        console.log(form)

        const isExistTraning = await models.currentTraning.findOne({
            where: {
                date: {
                    [modules.Op.eq]: new Date(form.date),
                },
            }
        })

        if (!isExistTraning && !form.id_traning) {
            const { id_traning } = await models.currentTraning.create({
                id_user,
                date: form.date,
            })

            idTraning = id_traning
        }

        const finalId = form.id_traning ? form.id_traning : idTraning;

        const bulkedActivities = form.activitiesForTraning.map((el) => ({
            id_activity: el.id_activity,
            id_traning: finalId,
        }))

        models.activitiesTraningForm.destroy({
            where: {
                id_traning: finalId,
            },
        }),

        await models.activitiesTraningForm.bulkCreate(bulkedActivities)

        return true;
    }
}

export default new CurrentTraning()
