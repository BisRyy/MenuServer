const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(
      token,
      process.env.MenuHub_Private_Key || config.get("API_Private_Key")
    );
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
