const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const genAuthToken = require("../utils/genAuthToken");


// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const GetUser = asyncHandler(async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId);

    user.password = undefined;
    user.__v = undefined;

    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});


module.exports = {
GetUser
};