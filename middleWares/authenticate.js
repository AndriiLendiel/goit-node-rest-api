const jwt = require('jsonwebtoken')
const {User} = require('../models/user');

const {HttpError} = require('../helpers');

const {SECRET_KEY} = process.env;

const authenticate = async(req, res) => {
    const {authorization} = req.headers
    console.log(authorization);
}

module.exports = authenticate