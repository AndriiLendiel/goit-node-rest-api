const express = require ("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact 
} = require ("../controllers/contactsControllers.js");
const {validateBody, validateID, authenticate} = require('../middleWares');


const {schemas} = require('../models/contact.js')

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id",  authenticate, validateID, getOneContact);

contactsRouter.delete("/:id",  authenticate, validateID, deleteContact);

contactsRouter.post("/",  authenticate, validateBody(schemas.createContactSchema), createContact);

contactsRouter.put("/:id",  authenticate, validateID, validateBody(schemas.updateContactSchema), updateContact);

contactsRouter.put("/:id/favorite",  authenticate, validateID, validateBody(schemas.updateFavoriteSchema), updateStatusContact );


module.exports = contactsRouter;
