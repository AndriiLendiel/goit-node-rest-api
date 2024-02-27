

const {Schema, model} = require('mongoose')
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          }
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
const schemas ={
  registerSchema,
  loginSchema
}
userSchema.post('save', handleMongooseError)
const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
}