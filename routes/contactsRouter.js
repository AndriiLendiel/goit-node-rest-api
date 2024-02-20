const express = require ("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact 
} = require ("../controllers/contactsControllers.js");
const {validateBody, validateID} = require('../middleWares');


const {schemas} = require('../models/contact.js')

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", validateID, getOneContact);

contactsRouter.delete("/:id", validateID, deleteContact);

contactsRouter.post("/", validateBody(schemas.createContactSchema), createContact);

contactsRouter.put("/:id", validateID, validateBody(schemas.updateContactSchema), updateContact);

contactsRouter.put("/:id/favorite", validateID, validateBody(schemas.updateFavoriteSchema), updateStatusContact );


module.exports = contactsRouter;
