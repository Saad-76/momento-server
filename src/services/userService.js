const { Sequelize } = require("sequelize");
const Users = require("../models/user");

const createUser = async (user) => {
  try {
    const createdUser = Users.create(user);
    if (!createdUser) {
      console.log("Something went wrong in creating new user");
    }
    return { createdUser: createdUser };
  } catch (error) {
    console.log(error, "error in service");
    return { err: `Something went wrong Err: ${error}` };
  }
};

const userByMail = async (email) => {
  try {
    const user = await Users.findOne({
      where: { email: { [Sequelize.Op.iLike]: email } },
    });
    return { user };
  } catch (error) {
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};

const updateUser = async (user, id) => {
  try {
    const updated =await Users.update(user, { where: { id } });
    return { updated: updated };
  } catch (error) {
    return { error: { message: "Something went wrong, try again", code: 500 } };
  }
};

module.exports = {
  createUser,
  userByMail,
  updateUser
};
