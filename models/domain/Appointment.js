const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema(
  {
    createdDate: { type: Date, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    patient: { type: mongoose.Types.ObjectId },
    doctor: { type: mongoose.Types.ObjectId },
    status: { type: String, required: true }
  }
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)
module.exports = Appointment