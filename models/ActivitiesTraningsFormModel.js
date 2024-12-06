import db from "../dbconnection.js";
import  { modules } from "../dbconnection.js";

const sequelize = db;
const activitiesTraningsForm = sequelize.define("trainings_activities_forms", {
    id_traning: {
        type: modules.DataTypes.INTEGER,
    },

    id_activity: {
        type: modules.DataTypes.INTEGER,
    },
},
{
    scopes: {
       withoutFormInformation: {
            attributes: [],
       }
    }
}
);

export default sequelize.model('trainings_activities_forms')
