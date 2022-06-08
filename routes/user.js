const express = require('express')
const router = express.Router()
const { registration, login, updatePassword } = require('../controllers/user')

router.post('/register', registration)
router.post('/login', login)
router.put('/updatePassword', updatePassword)
module.exports = router