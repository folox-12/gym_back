import db from '../dbconnection.js'
import { modules } from '../dbconnection.js'

const sequelize = db
const currentTraning = sequelize.define(
    'current_tranings',
    {
        id_traning: {
            type: modules.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },

        id_user: {
            type: modules.DataTypes.INTEGER,
        },

        date: {
            type: modules.DataTypes.DATE,
        },
    },
)

export default sequelize.model('current_tranings')
