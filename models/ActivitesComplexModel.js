import db from '../dbconnection.js'
import { modules } from '../dbconnection.js'

const sequelize = db
const activitiesComplex = sequelize.define('activities_complex', {
    id_activities_complex: {
        type: modules.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: modules.DataTypes.TEXT(40),
    },

    description: {
        type: modules.DataTypes.TEXT(100),
    },

    date_creation: {
        type: modules.DataTypes.DATE,
    },
},
{
scopes: {
    onlyIds: {
        attributes: ['id_activities_complex']
    }
}
}
)

export default sequelize.model('activities_complex')
