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
const { createTransport } = require('./shared/mail')

app.use('/user', userRoute)
app.use('/appointment', appointmentRoute)

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, async() => {
  console.log('Connected to DB!')
  rolesMigration()
  const transporter = await createTransport()
  cron.schedule('* * * * * ', () => {
    getAppointments(transporter)
  })

  app.listen(process.env.PORT)
})
