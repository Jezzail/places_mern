const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, "private_secret_key_for_jwt");
    req.userData = { id: decodedToken.id };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed", 401));
  }
};

module.exports = checkAuth;
