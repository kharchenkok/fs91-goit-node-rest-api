import { Types } from "mongoose";
import tryCatchWrapper from "../helpers/tryCatchWrapper.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModel.js";

export const checkCreateContactData = (req, res, next) => {
  const { value, error } = createContactSchema(req.body);
  if (error) throw HttpError(400, error.message);

  req.body = value;
  next();
};

export const checkContactId = tryCatchWrapper(async (req, res, next) => {
  const { id } = req.params;
  const isIdValid = Types.ObjectId.isValid(id);
  if (!isIdValid) throw HttpError(404, "Contact not found");
  const contactExists = await Contact.exists({ _id: id });
  if (!contactExists) throw HttpError(404, "Contact not found");
  next();
});

export const checkUpdateContactData = (req, res, next) => {
  const { value, error } = updateContactSchema(req.body);
  if (error) throw HttpError(400, error.message);

  if (Object.keys(value).length === 0)
    throw HttpError(400, "Body must have at least one field");

  req.body = value;
  next();
};

export const checkFavoriteField = (req, res, next) => {
  const { favorite } = req.body;
  if (favorite === undefined || typeof favorite !== "boolean") {
    throw HttpError(400, "Missing field favorite or wrong type");
  }
  next();
};
