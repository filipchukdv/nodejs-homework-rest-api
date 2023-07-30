import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, `${icontactId} is not valid`));
  }
  next();
};

export default isValidId;
