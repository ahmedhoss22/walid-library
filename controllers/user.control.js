const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const authController = {
  register: asyncHandler(async (req, res) => {
    const existUser = await User.findOne({ username: req.body.username });
    if (existUser) {
      return res.status(409).send({ message: "username is already taken !!" });
    }
    let newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: "Account Created !!" });
  }),

  login: asyncHandler(async (req, res) => {
    const data = req.body;
    let user = await User.findOne({ username: data.username });

    if (!user) {
      return res.status(400).send({ message: "اسم المستخدم او كلمة السر ليس صحيح" });
    }

    let validPass = await user.comparePassword(data.password);
    if (!validPass) {
      return res.status(400).send({ message: "اسم المستخدم او كلمة السر ليس صحيح" });
    }

    let token = await jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: "7d" });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    res.send('Login successful and token set in cookie');
  }),

  logout: asyncHandler(async (req, res) => {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Set the expiration date to a past date
    });

    res.send('Logout successful');
  })
}

module.exports = authController;
