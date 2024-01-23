import contactsService from "../services/contactsServices.js";
import tryCatchWrapper from "../helpers/tryCatchWrapper.js";
import HttpError from "../helpers/HttpError.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = contactsService;
export const getAllContacts = tryCatchWrapper(async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

export const getOneContact = tryCatchWrapper(async (req, res) => {
  const contactId = req.params.id;
  const contact = await getContactById(contactId);
  if (!contact) throw HttpError(404);
  res.status(200).json(contact);
});

export const deleteContact = tryCatchWrapper(async (req, res) => {
  const contactId = req.params.id;
  const removedContact = await removeContact(contactId);

  if (!removedContact) throw HttpError(404);

  res.status(200).json(removedContact);
});

export const createContact = tryCatchWrapper(async (req, res) => {
  const { value, error } = createContactSchema(req.body);
  if (error) throw HttpError(400, error.message);
  const { name, email, phone } = value;

  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
});

export const updateContact = tryCatchWrapper(async (req, res) => {
  const { value, error } = updateContactSchema(req.body);
  if (error) throw HttpError(400, error.message);

  const contactId = req.params.id;
  const { name, email, phone } = value;

  if (!name && !email && !phone)
    throw HttpError(400, "Body must have at least one field");

  const updatedContact = await updateContactById(contactId, value);

  if (!updatedContact) throw HttpError(404);

  res.status(200).json(updatedContact);
});
