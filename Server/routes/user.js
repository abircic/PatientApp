const express = require('express')
const router = express.Router()
const { registration, login, updatePassword, fetchDoctors } = require('../controllers/user')
const { errorHandler } = require('../middlewares/error')

router.post('/register', errorHandler(registration))
router.post('/login', errorHandler(login))
router.put('/updatePassword', errorHandler(updatePassword))
router.get('/fetchDoctors', errorHandler(fetchDoctors))
module.exports = router