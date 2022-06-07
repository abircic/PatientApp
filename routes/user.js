const express = require('express')
const router = express.Router()
const User = require('../models/domain/User')
const config = require('../config.json')
const passwordHelper = require('../shared/helpers')
const { validateRegisterRequest, validateLoginRequest } = require('../shared/validator')

router.post('/register', async(req, res) => {
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
    res.json({ sucess: true, message: config.responseMessages.successMessage })
  } catch (err) {

    if (err.code === 11000 && err.name === 'MongoServerError') {
      res.status(400)
        .json({ sucess: false, message: config.responseMessages.alreadyExistMessage })
      return
    }
    console.log(err)
    res.status(400)
      .json({ sucess: false, message: config.responseMessages.invalidRequestMessage })
  }

})

router.post('/login', async(req, res) => {
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

  }
})
module.exports = router