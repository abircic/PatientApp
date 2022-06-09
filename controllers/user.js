const User = require('../models/domain/User')
const config = require('../config.json')
const passwordHelper = require('../shared/helpers')
const { validateRegisterRequest, validateLoginRequest, validateUpdatePasswordRequest } = require('../shared/validator')

const registration = async(req, res) => {
  try {
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
  } catch (err) {

    if (err.code === 11000 && err.name === 'MongoServerError') {
      res.status(400)
        .json({ sucess: false, message: config.responseMessages.alreadyExist })
      return
    }
    console.log(err)
    res.status(400)
      .json({ sucess: false, message: config.responseMessages.invalidRequest })
  }
}

const login = async(req, res) => {
  try {
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
            message: config.responseMessages.invalidUsernameMessage
          })
    }
    if (!(await passwordHelper.comparePassword(req.body.password, user.password))) {
      return res.status(400)
        .json(
          {
            sucess: false,
            message: config.responseMessages.invalidPasswordMessage
          })
    }
    return res.status(200)
      .json(
        {
          sucess: true,
          message: config.responseMessages.successMessage
        })
  } catch {
    return res.status(500)
      .json(
        {
          success: false,
          message: config.responseMessages.unexpectedErrorOccurredMessage
        }
      )
  }
}

const updatePasword = async(req, res) => {
  try {
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
            message: config.responseMessages.invalidUsernameMessage
          })
    }
    if (!(await passwordHelper.comparePassword(req.body.oldPassword, user.password))) {
      return res.status(400)
        .json(
          {
            sucess: false,
            message: config.responseMessages.invalidPasswordMessage
          })
    }
    res.json({ sucess: true, message: config.responseMessages.successMessage })
  } catch (err) {
    console.log(err)
    return res.status(500)
      .json(
        {
          success: false,
          message: config.responseMessages.unexpectedErrorOccurredMessage
        }
      )
  }
}

const fetchDoctors = async(_req, res) => {
  const doctors = (await User.find({ type: 'Doctor' })).map(x => {
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
        result: doctors
      }
    )
}
module.exports.registration = registration
module.exports.login = login
module.exports.updatePassword = updatePasword
module.exports.fetchDoctors = fetchDoctors