import User from "../models/user.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decoratos/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import gravatar from "gravatar";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { sendVerificationEmail } from "../helpers/emailVerification.js";
import { log } from "console";

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email.toLowerCase(), {
    s: "250",
    protocol: "https",
    d: "monsterid",
  });
  const verificationCode = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });
  sendVerificationEmail(email, verificationCode);
  res.status(201).json({ email: newUser.email });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is invalid");
  }
  if (!user.verified) {
    throw HttpError(401, "User in not verified");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is invalid");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1y" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: "" });
  res.json("Logout successful");
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.json(result);
};
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  Jimp.read(oldPath)
    .then((avatar) => avatar.resize(250, 250).write(newPath))
    .then(fs.unlink(oldPath))
    .catch((err) => res.status(500).json(err));
  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL: newPath },
    {
      new: true,
    }
  );
  res.json(result);
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  console.log(user);
  if (!user) {
    throw HttpError(404, "User is not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verificationCode: " ",
    verified: true,
  });
  res.json({ message: "Verified successfully" });
};

const resendVerifyCode = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User is not found");
  }
  if (user.verified) {
    throw HttpError(400, "Verification has already been passed");
  }

  sendVerificationEmail(email, user.verificationCode);
  res.json({ message: "Verification email sent" });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendVerifyCode: ctrlWrapper(resendVerifyCode),
};
