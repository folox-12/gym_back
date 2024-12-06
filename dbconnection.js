import Sequelize from "sequelize";
import { DataTypes, Op } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

export const modules = {
  Op,
  DataTypes,
};

const db = new Sequelize({
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  define: {
    timestamps: false,
  },
});

export default db;

export function openConnection() {
  db.authenticate();
}

export function closeConnection() {
  db.close();
}

export function countRows(col, as) {
    return [db.fn("COUNT", db.col(col), as)]
}
