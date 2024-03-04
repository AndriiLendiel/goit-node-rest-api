

const {Schema, model} = require('mongoose')
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscription = ["starter", "pro", "business"]
const userSchema = new Schema({
        name: {
          type: String,
          required: [true, 'Name is required'],
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          match: emailRegexp,
          unique: true,
        },
        subscription: {
          type: String,
          enum: subscription,
          required: true,
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },

      }, {versionKey:false, timestamps: true}
)

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscription).required(),
})
const schemas ={
  registerSchema,
  loginSchema,
  subscriptionSchema
}
userSchema.post('save', handleMongooseError)
const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
}