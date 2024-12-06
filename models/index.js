import UserModel from "./UserModel.js";
import BodyPartModel from "./BodyPartModel.js";
import DifficultyModel from "./DifficultyModel.js";
import ActivitesComplexModel from "./ActivitesComplexModel.js";
import ActivitiesFormModel from "./ActivitiesFormModel.js";
import ActivityModel from "./ActivityModel.js";
import subsriptionComplexesListsModel from "./subsriptionComplexesListsModel.js";
import CurrentTraningModel from "./CurrentTraningModel.js";
import ActivitiesTraningsFormModel from "./ActivitiesTraningsFormModel.js";
import traningsListModel from "./traningsListModel.js";


UserModel.belongsToMany(ActivitesComplexModel, {
    as: 'subscription',
    through: subsriptionComplexesListsModel,
    foreignKey: 'id_user',
    otherKey: 'id_activities_complex',
})

UserModel.hasMany(CurrentTraningModel, {
    as: 'user_tranings',
    foreignKey: 'id_user',
})

ActivityModel.belongsTo(BodyPartModel, { as: 'bodypart', otherKey: 'id_body_part', foreignKey: 'id_body_part' })
ActivityModel.belongsTo(DifficultyModel, { as: 'difficulty', foreignKey: 'id_difficulty', otherKey: 'id' })
ActivitesComplexModel.belongsTo(UserModel.scope('showAuthorInformation'), {
    as: 'author',
    foreignKey: 'id_author',
    otherKey: 'id'
})

ActivitesComplexModel.belongsToMany(ActivityModel, {
    as: 'activities',
    through: ActivitiesFormModel,
    foreignKey: 'id_activities_complex',
    otherKey: 'id_activity',
})

CurrentTraningModel.belongsToMany(ActivityModel, {
    as: 'activitiesForTraning',
    through: ActivitiesTraningsFormModel,
    foreignKey: 'id_traning',
    otherKey: 'id_activity',
})


export default {
    user: UserModel,
    bodyPart: BodyPartModel,
    difficult: DifficultyModel,
    activity: ActivityModel,
    complex: ActivitesComplexModel,
    activitiesForm: ActivitiesFormModel,
    activitiesTraningForm: ActivitiesTraningsFormModel,
    currentTraning: CurrentTraningModel,
    subscription: subsriptionComplexesListsModel,
    tranings: traningsListModel,
}
