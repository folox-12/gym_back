import db from "../dbconnection.js";

const sequelize = db;
sequelize.define("difficulty", {
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export default sequelize.model('difficulty')
