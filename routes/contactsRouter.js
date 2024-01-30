import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactStatus,
} from "../controllers/contactsControllers.js";
import {
  checkContactId,
  checkCreateContactData,
  checkFavoriteField,
  checkUpdateContactData,
} from "../middlewares/contactMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .get(getAllContacts)
  .post(checkCreateContactData, createContact);

contactsRouter.use("/:id", checkContactId);

contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(checkUpdateContactData, updateContact);

contactsRouter
  .route("/:id/favorite")
  .patch(checkFavoriteField, updateContactStatus);

export default contactsRouter;
