import ApiError from '../excepctions/api-erros.js';
import ActivitiesFormModel from '../models/ActivitiesFormModel.js';

class ActivitiesFormService {
    async getAllActivities(id_activities_form) {
        const activities = await ActivitiesFormModel.findAll({})
        return activities;
    }
}

export default new ActivitiesFormService;
