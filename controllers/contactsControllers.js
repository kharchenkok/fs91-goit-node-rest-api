import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
  updateStatusContact,
} from "../services/contactsServices.js";
import tryCatchWrapper from "../helpers/tryCatchWrapper.js";

export const getAllContacts = tryCatchWrapper(async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

export const getOneContact = tryCatchWrapper(async (req, res) => {
  const contact = await getContactById(req.params.id);
  res.status(200).json(contact);
});

export const deleteContact = tryCatchWrapper(async (req, res) => {
  const contactId = req.params.id;
  const removedContact = await removeContact(contactId);
  res.status(200).json(removedContact);
});

export const createContact = tryCatchWrapper(async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

export const updateContact = tryCatchWrapper(async (req, res) => {
  const updatedContact = await updateContactById(req.params.id, req.body);
  res.status(200).json(updatedContact);
});

export const updateContactStatus = tryCatchWrapper(async (req, res) => {
  const updatedContact = await updateStatusContact(req.params.id, req.body);
  res.status(200).json(updatedContact);
});
