const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("relations_app", "postgres", "admin", {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
module.exports = sequelize;
