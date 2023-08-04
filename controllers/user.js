import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers = async (req, res) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    //if user does not exist
    if (!user) return next(new ErrorHandler("Invalid email & password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    // if required password is not match
    if (!isMatch)
      return next(new ErrorHandler("Invalid email & password", 400));

    sendCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    //already registered user is not allowed to register again
    if (user) return next(new ErrorHandler("User already exists", 400));
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });
    sendCookie(user, res, "Register Successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
export const logout = (req, res) => {
  console.log(process.env.NODE_ENV === "Development");
  res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
