const db = require("../config/db");
const { Sequelize } = require("sequelize");

const User = db.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    // role: {
    //   //   type: DataTypes.ARRAY(Sequelize.toString(50)),
    //   //   defaultValue: ["customer"],
    //   // },
  }
);

module.exports = User;
