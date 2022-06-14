const express = require('express')
const router = express.Router()
const { create, updateOne } = require('../controllers/appointment')

router.post('/create', create)
router.put('/update', updateOne)

module.exports = router