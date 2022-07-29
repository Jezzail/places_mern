// /controllers/users-controllers.js
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError("Fetching users failed, try again later", 500));
  }

  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  if (existingUser) {
    return next(new HttpError("Email already exists", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Creating user failed", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { id: createdUser.id, email: createdUser.email },
      process.env.JWT_PRIV_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Creating user failed", 500));
  }

  res.status(201).json({
    user: { id: createdUser.id, email: createdUser.email, token: token },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Invalid credentials", 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials", 403));
  }

  let token;
  try {
    token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_PRIV_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Logging in user failed", 500));
  }

  res.json({
    user: {
      id: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
