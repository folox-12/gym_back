import db from "../dbconnection.js";

const sequelize = db;
sequelize.define("bodyparts", {
    id_body_part: {
        type: Number,
        autoIncrement: true,
        primaryKey: true,
    },

    code: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
});

export default sequelize.model('bodyparts')
