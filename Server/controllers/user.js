const User = require('../models/domain/User')
const config = require('../config.json')
const passwordHelper = require('../shared/bcrypt')
const { validateRegisterRequest, validateLoginRequest, validateUpdatePasswordRequest } = require('../shared/validator')

const registration = async(req, res) => {
  const result = validateRegisterRequest(req.body)
  if (result) {
    return res.status(400)
      .json(
        {
          success: false,
          message: result
        })
  }
  const user = new User(
    {
      username: req.body.username,
      type: req.body.type,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    })
  user.password = await passwordHelper.cryptPassword(user.password)
  await user.save()
  res.json({ sucess: true, message: config.responseMessages.success })
}

const login = async(req, res) => {
  const result = validateLoginRequest(req.body)
  if (result) {
    return res.status(400)
      .json(
        {
          success: false,
          message: result
        })
  }
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    return res.status(400)
      .json(
        {
          sucess: false,
          message: config.responseMessages.invalidUsername
        })
  }
  if (!(await passwordHelper.comparePassword(req.body.password, user.password))) {
    return res.status(400)
      .json(
        {
          sucess: false,
          message: config.responseMessages.invalidPassword
        })
  }
  return res.status(200)
    .json(
      {
        sucess: true,
        message: config.responseMessages.success,
        id: user._id,
        type: user.type
      })
}

const updatePassword = async(req, res) => {
  const result = validateUpdatePasswordRequest(req.body)
  if (result) {
    return res.status(400)
      .json(
        {
          success: false,
          message: result
        })
  }
  const user = await User.findOneAndUpdate({ username: req.body.username }, { password: await passwordHelper.cryptPassword(req.body.newPassword) })

  if (!user) {
    return res.status(400)
      .json(
        {
          sucess: false,
          message: config.responseMessages.invalidUsername
        })
  }
  if (!(await passwordHelper.comparePassword(req.body.oldPassword, user.password))) {
    return res.status(400)
      .json(
        {
          sucess: false,
          message: config.responseMessages.invalidPassword
        })
  }
  res.json({ sucess: true, message: config.responseMessages.success })
}

const fetchDoctors = async(_req, res) => {
  const doctors = (await User.find({ type: 1 })).map(x => {
    return {
      id: x._id,
      firstName: x.firstName,
      lastName: x.lastName
    }
  })
  return res.status(200)
    .json(
      {
        success: true,
        message: config.responseMessages.success,
        result: doctors
      }
    )
}

module.exports = { registration, login, updatePassword, fetchDoctors }