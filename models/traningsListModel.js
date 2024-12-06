import db from '../dbconnection.js'
import { modules } from '../dbconnection.js'

const sequelize = db
const traningsListModel = sequelize.define(
    'current_traning_lists',
    {
        id_traning: {
            type: modules.DataTypes.INTEGER,
        },

        id_user: {
            type: modules.DataTypes.INTEGER,
            required:false,
        },
    },
)

traningsListModel.removeAttribute('id')
export default sequelize.model('current_traning_lists')
