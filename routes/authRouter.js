const express = require('express')


const {register, login, logout, getCurrent, updateSubscription, updateAvatar} = require('../controllers/authControllers')
const {validateBody, authenticate, upload} = require('../middleWares')

const authRouter = express.Router()
const {schemas} = require('../models/user')

authRouter.post('/users/register',  validateBody(schemas.registerSchema), register)

authRouter.post('/users/login', validateBody(schemas.loginSchema), login)

authRouter.post('/users/logout', authenticate, logout)

authRouter.get('/users/current', authenticate, getCurrent)

authRouter.patch('/users/subscription', authenticate, validateBody(schemas.subscriptionSchema), updateSubscription)

authRouter.patch ('/users/avatars', authenticate, upload.single('avatar'), updateAvatar)

module.exports = authRouter