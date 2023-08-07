import User from "../models/users.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decoratos/index.js";
import { userAuthSchema } from "../validation/users-schemas.js";

const signup = async (req, res) => {
  const { error } = userAuthSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const newUser = await User.create(req.body);
  res.status(201).json({ email: newUser.email });
};
const login = async (req, res) => {};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
};
