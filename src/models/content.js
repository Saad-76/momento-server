const { Sequelize } = require("sequelize");

const db = require("../config/db");

const Content = db.define("content", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  img: {
    type: Sequelize.BLOB,
    allowNull: false,
  },
});

module.exports = Content;
