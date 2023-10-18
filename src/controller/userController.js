const userService = require("../services/userService");
const authService = require("../services/authService");

const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const email1 = email.toLowerCase();
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name: name,
      email: email1,
      phone: phone,
      password: hashedPassword,
      // role: role,
    };
    userService.createUser(newUser);
    return res.send({
      response: `User Created Sucessfully${JSON.stringify(newUser)}`,
      status: 200,
    });
  } catch (error) {
    console.log(error, "error in controller");
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const email1 = email.toLowerCase();
    const resp = await userService.userByMail(email1);
    if (res.error) return res.status(500).send("Error in Login User");
    const resp2 = await authService.passwordVerification(
      password,
      resp.user.password
    );
    if (resp2.error) return res.status(500).send("Password is not Valid");
    const code = Math.floor(Math.random() * (999 - 100 + 1)) + 999;
    const resp3 = await authService.signInToken(resp.user.email, code);
    if (resp3.error) return res.status(500).send(resp3.error.message);
    res.status(200).send({
      message: "User Login Successfully",
      token: resp3.token,
      code: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const email1 = email.toLowerCase();
    const resp = await userService.userByMail(email1);
    if (resp.error)
      return res
        .status(401)
        .send({ message: "User not found again this email", code: 401 });
    const randomCode = Math.floor(10000000 + Math.random() * 90000000);
    const code = "Rela" + "@" + randomCode;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(code.toString(), salt);
    resp.user.password = hashedPassword;
    let newPass = { password: resp.user.password };
    let resp2 = await userService.updateUser(newPass, resp.user.id);
    if (resp2.error) return res.status(500).send(res.error.message);
    res.status(200).send({ message: "User password updated Successfully!" });
  } catch (error) {
    res.status(500).send({ messsage: "Something went wrong", code: 500 });
  }
};

module.exports = { registerUser, signIn, forgetPassword };
