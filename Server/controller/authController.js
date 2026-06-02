import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { sendResponse } from "../helper/responseHelper.js";
import {
  generateAccessToken,
  generateRefereshToken,
} from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      sendResponse(res, false, 401, "Provide all the form ");
    }
    const user = await User.findOne({ email });
    if (!user) {
      sendResponse(res, false, 400, "User Not found ");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      sendResponse(res, false, 400, "Invalid password");
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefereshToken(user._id);
    sendResponse(res, true, 200, "SuccessFully log in ", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error ",
    });
  }
};

export const getusers = async (req, res) => {
  const user = await User.find().select("-password");
  sendResponse(res, true, 201, "User Fetched Successfully", user);
};
