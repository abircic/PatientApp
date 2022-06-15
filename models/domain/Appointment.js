const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema(
  {
    createdDate: { type: Date, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    patient: { type: mongoose.Types.ObjectId, required: true, ref: 'User', immutable: true },
    doctor: { type: mongoose.Types.ObjectId, required: true, ref: 'User', immutable: true },
    status: { type: String, required: true }
  }
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)
module.exports = Appointment