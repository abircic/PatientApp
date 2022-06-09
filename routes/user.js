const express = require('express')
const router = express.Router()
const { registration, login, updatePassword, fetchDoctors } = require('../controllers/user')

router.post('/register', registration)
router.post('/login', login)
router.put('/updatePassword', updatePassword)
router.get('/fetchDoctors', fetchDoctors)
module.exports = router