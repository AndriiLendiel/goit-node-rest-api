
const {HttpError} = require ("../helpers");
const {isValidObjectId} = require('mongoose')

const validateID = (req,res,next) => {
const {id} = req.params;
if(!isValidObjectId(id)) {
    next(HttpError(400, `${is} is not valid id`))
}
next()
};

module.exports = validateID