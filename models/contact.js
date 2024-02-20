// const fs = require('fs/promises')

const {Schema, model } =require('mongoose')
const Joi = require('joi')


const contactSchema = new Schema({
    name:{
type: String,
required: true,
    } ,
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
}, {versionKey:false, timestamps: true})

const Contact = model('contact', contactSchema)

module.exports = {
    Contact
}