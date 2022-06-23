const express = require('express')
const router = express.Router()
const { create, updateOne } = require('../controllers/appointment')
const { errorHandler } = require('../middlewares/error')

router.post('/create', errorHandler(create))
router.put('/update', errorHandler(updateOne))

module.exports = router