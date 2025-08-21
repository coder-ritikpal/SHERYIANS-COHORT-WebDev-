const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getRegisterController(req, res) {
  res.render("register");
}

async function postRegisterController(req, res) {
  const { username, email, password } = req.body;

  const userExists = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (userExists) {
    return res.render("register", { error: "User already exists with this username or email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({ username:username, email:email, password: hashedPassword });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token);

  return res.redirect("/");
}

async function getLoginController(req, res) {
  res.render("login");      
}

async function postLoginController(req, res) {
  const { identifier, password } = req.body;
  // Find user by username or email
  const user = await userModel.findOne({
    $or: [
      { username: identifier },
      { email: identifier }
    ]
  });
  if (!user) {
    return res.render("login", { error: "User not found!Please Register" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.render("login", { error: "Invalid password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
};
