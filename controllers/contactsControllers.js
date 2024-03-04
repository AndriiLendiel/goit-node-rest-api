
const {Contact} = require('../models/contact.js')

const {HttpError} = require('../helpers')
console.log(HttpError);

const getAllContacts = async (req, res, next) => {
    try {
        console.log(req.query);
        const {page = 1, limit= 20, favorite} = req.query;
        console.log(favorite);
        const skip = (page -1) * limit
        const {_id: owner} = req.user
        let searchList = {};
        favorite ?  searchList = {owner, favorite} :  searchList = {owner}
        
        const result = await Contact.find(searchList, "-createdAt -updatedAt", {skip, limit } ).populate("owner", "name email")

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
    const result = await Contact.findById(id)
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
    const result = await Contact.findByIdAndDelete(id)
    if(!result) {
        throw HttpError(404)
    }
    res.status(200).json({
        message: 'Delete success'
    })
};

const createContact = async (req, res, next) => {
try {
    const {_id: owner} = req.user

    const result = await  Contact.create({...req.body, owner})
    console.log(result);
    res.status(201).json(result)
} catch (error) {
    next(error)
}

}


const updateContact = async (req, res, next) => {
try {
    const {id} = req.params;
    const result = await  Contact.findByIdAndUpdate(id, req.body)
    if(!result) {
        throw HttpError(404)
    }
    res.status(404).json(result)
} 
catch (error) {
    next(error)
}
};

const updateStatusContact  = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await  Contact.findByIdAndUpdate(id, req.body, {new:true})
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
    updateContact,
    updateStatusContact
}