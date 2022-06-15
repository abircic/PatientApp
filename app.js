const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cron = require('node-cron')
require('dotenv')
  .config()
app.use(bodyParser.json())
// Import Routes
const userRoute = require('./routes/user')
const appointmentRoute = require('./routes/appointment')
const { rolesMigration } = require('./shared/bcrypt')
const { getAppointments } = require('./shared/jobs')

app.use('/user', userRoute)
app.use('/appointment', appointmentRoute)

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, () => {
  console.log('Connected to DB!')
  rolesMigration()
  cron.schedule('* * * * *', () => {
    getAppointments()
    console.log('runs in every minut')
  })

  app.listen(process.env.PORT)
})
