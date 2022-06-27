const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cron = require('node-cron')
const cors = require('cors')
require('dotenv')
  .config()
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3001'
}))
app.use(express.json())

// Import Routes
const userRoute = require('./routes/user')
const appointmentRoute = require('./routes/appointment')
const { rolesMigration } = require('./shared/bcrypt')
const { getAppointments } = require('./shared/jobs')
const { createTransport } = require('./shared/mail')
const { errorMiddleware, notFound } = require('./middlewares/error')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { }))
app.use('/user', userRoute)
app.use('/appointment', appointmentRoute)
app.use('*', notFound)
app.use(errorMiddleware)

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, async() => {
  console.log('Connected to DB!')
  rolesMigration()
  const transporter = await createTransport()
  cron.schedule('* * * * * ', () => {
    getAppointments(transporter)
  })

  app.listen(process.env.PORT)
})
