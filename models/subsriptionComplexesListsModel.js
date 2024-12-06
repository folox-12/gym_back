import db from '../dbconnection.js'
import { modules } from '../dbconnection.js'

const sequelize = db
const SubscriptionComplexesLists = sequelize.define(
    'subsription_complexes_lists',
    {
        id_activities_complex: {
            type: modules.DataTypes.INTEGER,
        },

        id_user: {
            type: modules.DataTypes.INTEGER,
            required:false,
        },
    },
    {
        tableName: 'subsription_complexes_lists'
    }
)

SubscriptionComplexesLists.removeAttribute('id')
export default sequelize.model('subsription_complexes_lists')
