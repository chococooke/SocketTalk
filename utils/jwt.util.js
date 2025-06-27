const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ quiet: true });

const jwt_secret = process.env.JWT_SECRET;

module.exports.sign = async (payload) => {
  if (!payload) {
    return { error: "Payload not received" };
  }

  try {
    const token = await jwt.sign(payload, jwt_secret);
    return { token };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

module.exports.verify = async (token) => {
  if (!token) {
    return { error: "token not recevied" };
  }

  try {
    const data = await jwt.verify(token, jwt_secret);
    return { data };
  } catch (err) {
    return { error: err.message };
  }
};
