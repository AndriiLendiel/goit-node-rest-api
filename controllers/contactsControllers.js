const contactsService = require ("../services/contactsServices.js");
const {Contact} = require('../models/contact.js')

const {HttpError} = require('../helpers')
console.log(HttpError);

const getAllContacts = async (req, res, next) => {
    try {
        const result = await Contact.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        })
    }
};

const getOneContact = async (req, res, next) => {
try {
    const {id} =  req.params;
    const result = await contactsService.getContactById(id)
    if(!result) {
        throw HttpError(404)
    }
    res.status(200).json(result)
} catch (error) {
    next(error)
}
};

const deleteContact = async (req, res, next) => {
    const {id} = req.params
    const result = await contactsService.removeContact(id)
    if(!result) {
        throw HttpError(404)
    }
    res.status(200).json({
        message: 'Delete success'
    })
};

const createContact = async (req, res, next) => {
try {
    const result = await contactsService.addContact(req.body)
    res.status(201).json(result)
} catch (error) {
    next(error)
}
};

const updateContact = async (req, res, next) => {
try {
    const {id} = req.params;
    const result = await contactsService.updateById(id, req.body)
    if(!result) {
        throw HttpError(404)
    }
    res.status(404).json(result)
} 
catch (error) {
    next(error)
}
};


module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact
}