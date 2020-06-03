require("dotenv").config();
const Sequelize = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD, NODE_ENV } = process.env;

module.exports = new Sequelize({
  host: "localhost",
  username: DB_USER,
  password: DB_PASSWORD,
  database: NODE_ENV !== "test" ? DB_NAME : "quick-api-test",
  dialect: "mysql",
  logging: false,
});
