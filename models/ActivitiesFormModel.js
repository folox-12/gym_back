import db from "../dbconnection.js";
import  { modules } from "../dbconnection.js";

const sequelize = db;
const activitiesForm = sequelize.define("activities_form", {
    id_activities_complex: {
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

export default sequelize.model('activities_form')
