const { User } = require("../models");
const { sign, verify } = require("../utils/jwt.util.js");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Bad request" });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPwd,
    });

    const { token } = await sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    res.cookie("jw_token", token);
    res.status(201).json({ message: "signed up successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Bad request" });
    }

    const foundUser = await User.findOne({
      where: {
        email: email,
      },
    });

    const match = await bcrypt.compare(password, foundUser.dataValues.password);

    if (!match) return res.status(401).json({ error: "Invalid Credentials" });

    const { token } = await sign({
      id: foundUser.dataValues.id,
      email,
      username: foundUser.dataValues.username,
    });

    res.cookie("jw_token", token);
    res.status(200).json({
      message: "logged in successfullly",
      user: {
        username: foundUser.username,
        email: foundUser.email,
        id: foundUser.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
