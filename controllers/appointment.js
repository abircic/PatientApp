const Appointment = require('../models/domain/Appointment')
const User = require('../models/domain/User')
const config = require('../config.json')
const { validateCreateAppointmentRequest } = require('../shared/validator')
const { json } = require('body-parser')

const create = async(req, res) => {
  try {
    // validate request
    const result = validateCreateAppointmentRequest(req.body)
    if (result) {
      return res.status(400)
        .json(
          {
            success: false,
            message: result
          })
    }
    // validate fromDate and toDate
    if (req.body.fromDate >= req.body.toDate) {
      return res.status(400)
        .json(
          {
            success: false,
            message: config.responseMessages.invalidDate
          }
        )
    }
    // validate day of week
    const isValidDate = Object.values(config.allowedDays)
      .some(x => x === new Date(req.body.fromDate)
        .getDay())
    if (!isValidDate) {
      return res.status(400)
        .json(
          {
            sucess: false,
            message: config.responseMessages.invalidDayOfWeek
          }
        )
    }
    // validate patient
    const patient = await User.findById({ _id: req.body.patientId })// todo from JWT
    if (!patient) {
      return res.status(400)
        .json(
          {
            sucess: false,
            message: 'invalid_patient_id'
          })
    }
    // validate doctor
    const doctor = await User.findById({ _id: req.body.doctorId })
    if (!doctor) {
      return res.status(400)
        .json(
          {
            sucess: false,
            message: config.responseMessages.invalidDoctorId
          })
    }
    // validate doctor appointments
    // const test = await Appointment.find({ doctorId: doctor._id })
    // if(test.some(x=>x.fromDate >= req.body.fromDate  ))
    const appointment = new Appointment(
      {
        createdDate: Date.now(),
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        patient: patient,
        doctor: doctor,
        status: config.appointmentStatuses.Scheduled
      }
    )
    await appointment.save()
    res.json({ sucess: true, message: config.responseMessages.success })
  } catch (err) {
    console.log(err)
    res.json({ sucess: true, message: config.responseMessages.unexpectedErrorOccurred })
  }
}

module.exports.create = create