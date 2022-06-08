const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv')
  .config()
app.use(bodyParser.json())
// Import Routes
const postsRoute = require('./routes/user')
const { rolesMigration } = require('./shared/helpers')

app.use('/user', postsRoute)

// ROUTES

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, () => {
  console.log('Connected to DB!')
  rolesMigration()
  app.listen(process.env.PORT)
})
