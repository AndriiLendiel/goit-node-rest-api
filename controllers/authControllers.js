const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path')
const fs = require('fs/promises')


const {SECRET_KEY} = process.env
const {User} = require('../models/user')
const {HttpError, ctrlWrapper} = require('../helpers')

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars')

const register = async(req,res) => {
  const  {email, password} = req.body;
  const user = await User.findOne({email})

  if(user) {
    throw HttpError(409, "Email already is use")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const newUser = await User.create({...req.body, password: hashPassword, avatarURL})

console.log(newUser);
  res.status(201).json({
    name: newUser.name,
    email: newUser.email
  })
}

const login = async(req,res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(!user) {
    throw HttpError(401, "Invalid email or password")
  }
  const comparePassword = await bcrypt.compare(password, user.password)
  if(!comparePassword) {
    throw HttpError(401, "Invalid email or password")
  }
  const payload = {
    id: user._id
  }
  const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: '10h'})
  console.log(token);
  await User.findByIdAndUpdate(user._id, {token})
  res.status(201).json({
    message:`Welcome ${user.name}`,
    token

  })
}

const logout = async(req,res) => {
console.log(req.user);
const {_id} = req.user
await User.findByIdAndUpdate(_id,{token : ''})

res.json({
  message: 'Logout success'
})

}

const getCurrent = async(req,res) => {
  const {name,email} = req.user
  res.json({
    email,name
  })
}

const updateSubscription = async(req,res) => {
  try {
    const {_id,name} = req.user
    const result = await User.findByIdAndUpdate(_id, req.body, {new: true});
    const { subscription} = req.body
    res.json({
      name, subscription
    })
  } catch (error) {
    
  }
}

const updateAvatar = async (req, res) => {
  const {_id} = req.user;
  const {path: temUpload, originalname} = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName)
  await fs.rename(temUpload, resultUpload)
  const avatarURL = path.join('avatars', fileName)
  await User.findByIdAndUpdate(_id, {avatarURL})

  res.json({
    avatarURL
  })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar)
}