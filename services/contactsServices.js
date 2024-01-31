import { Contact } from "../models/contactModel.js";

function listContacts() {
  return Contact.find();
}

function getContactById(contactId) {
  return Contact.findById(contactId);
}

function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId) || null;
}

function addContact(contactData) {
  console.log("Contact Data:", contactData);
  return Contact.create(contactData);
}

async function updateContactById(contactId, updatedData) {
  const contact = await Contact.findById(contactId);
  Object.keys(updatedData).forEach((key) => {
    contact[key] = updatedData[key];
  });

  return contact.save();
}

async function updateStatusContact(contactId, updatedData) {
  if ("favorite" in updatedData) {
    const contact = await Contact.findById(contactId);
    if (!contact) return null;
    contact.favorite = updatedData.favorite;
    await contact.save();
    return contact;
  }
  return null;
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
