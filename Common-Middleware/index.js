const env = require("dotenv");
const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: "Authorization required!",
    });
  }
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({
      message: "User access Denied!",
    });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({
      message: "Access Denied!",
    });
  }
  next();
};
