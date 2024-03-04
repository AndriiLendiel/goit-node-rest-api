const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env
const {User} = require('../models/user')
const {HttpError, ctrlWrapper} = require('../helpers')

const register = async(req,res) => {
  const  {email, password} = req.body;
  const user = await User.findOne({email})

  if(user) {
    throw HttpError(409, "Email already is use")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({...req.body, password: hashPassword})

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
    console.log(req.body);
    res.json({
      name, subscription
    })
  } catch (error) {
    
  }
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription)
}