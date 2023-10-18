const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordVerification = async (password, userPassword) => {
  try {
    const validPassword = await bcrypt.compare(password, userPassword);
    if (!validPassword)
      return { error: { message: "Invalid password" }, code: 401 };
    return { validPassword: validPassword };
  } catch (error) {
    return { error: { message: "Invalid password" }, code: 500 };
  }
};

const signInToken = async (email, code) => {
  try {
    const token = jwt.sign({ email, code }, "relations_auth_key", {
      expiresIn: "300s",
    });
    if (!token) return { error: { message: "unauthorised", code: 403 } };
    return { token };
  } catch (error) {
    return { error: { message: "Error creating token" }, code: 500 };
  }
};

module.exports = {
  passwordVerification,
  signInToken,
};
