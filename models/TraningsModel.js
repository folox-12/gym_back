import db from "../dbconnection.js";

const sequelize = db;
sequelize.define("tranings", {
    id_traning: {
        type: Number,
        autoIncrement: true,
        primaryKey: true,
    },
    id_author: {
        type: String,
        required:true,
    },
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    date_creation: {
        type: String,
        required:true,
    },
});

export default sequelize.model('tranings')

