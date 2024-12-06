import db from '../dbconnection.js'
import { modules } from '../dbconnection.js'
import DifficultyModel from './DifficultyModel.js'
import BodyPartModel from './BodyPartModel.js'

const sequelize = db
const activity = sequelize.define('activities', {
    id_activity: {
        type: modules.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: modules.DataTypes.STRING,
        required: true,
    },

    kilocalories: {
        type: modules.DataTypes.NUMBER,
        required: false,
    },

    id_difficulty: {
        type: modules.DataTypes.NUMBER,
    },

    id_body_part: {
        type: modules.DataTypes.NUMBER,
    },
})

export default sequelize.model('activities')
