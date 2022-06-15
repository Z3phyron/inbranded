const User = require("../model/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const genAuthToken = require("../utils/genAuthToken");
const { SendMail } = require("../utils/sendMail");



const mailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const SignUpUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;



  try {
    let existingUser;

    existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(403);
      throw new Error("User with email already exists!!!");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();


    const token = user.generateAuthToken();

    user.password = undefined;
    user.__v = undefined;

    res.status(201).json({ user: user, token: token });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Sign in user
// @route   POST /api/auth/signIn
// @access  Public
const SignInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    let existingUser;

    existingUser = await User.findOne({
      email: email,
    });

    if (!existingUser) {
      res.status(400);
      throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(400);
      throw new Error("invalid password");
    }



    existingUser.password = undefined;
    existingUser.__v = undefined;

     const token = existingUser.generateAuthToken();

    res.status(201).json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});


module.exports = {
  SignUpUser,
  SignInUser,
 
};
