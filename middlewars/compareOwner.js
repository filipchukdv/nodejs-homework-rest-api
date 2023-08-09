import { ctrlWrapper } from "../decoratos/index.js";
import { HttpError } from "../helpers/index.js";
import Contact from "../models/contact.js";

const compareOwner = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  if (contact.owner.toString() !== userId.toString()) {
    throw HttpError(403);
  }
  next();
};

export default ctrlWrapper(compareOwner);
