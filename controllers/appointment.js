const Appointment = require('../models/domain/Appointment')
const User = require('../models/domain/User')
const config = require('../config.json')
const { validateCreateAppointmentRequest } = require('../shared/validator')
const date = require('date-and-time')

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
    // validate minute
    const fromDate = new Date(req.body.fromDate)
    fromDate.setSeconds(0, 0)
    if (fromDate.getMinutes() !== 30 && fromDate.getMinutes() !== 0) {
      return res.status(400)
        .json(
          {
            success: false,
            message: config.responseMessages.invalidMinuteInDateTime
          }
        )
    }
    // validate date time
    if (req.body.fromDate) {
      if (fromDate < Date.now()) {
        return res.status(400)
          .json(
            {
              success: false,
              message: config.responseMessages.invalidFrom
            }
          )
      }
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
    const patient = await User.findById({ _id: req.body.patientId })// todo id from JWT
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
    const appointments = await Appointment.find({ doctorId: doctor._id })
    if (appointments.some(x => x.fromDate.getTime() === fromDate.getTime())) {
      return res.status(400)
        .json(
          {
            success: false,
            message: config.responseMessages.invalidAppointmentDate
          }
        )
    }
    const appointment = new Appointment(
      {
        createdDate: Date.now(),
        fromDate: fromDate,
        toDate: date.addMinutes(fromDate, 30),
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

const updateOne = async(req, res) => {
  try {
    const appointment = await Appointment.findById({ _id: req.body.id })
    if (!appointment) {
      return res.status(400)
        .json(
          {
            sucess: false,
            message: config.responseMessages.invalidAppoitnment
          }
        )
    }
    // validate date time
    if (req.body.fromDate) {
      // validate minute
      const fromDate = new Date(req.body.fromDate)
      fromDate.setSeconds(0, 0)
      if (fromDate.getMinutes() !== 30 && fromDate.getMinutes() !== 0) {
        return res.status(400)
          .json(
            {
              success: false,
              message: config.responseMessages.invalidMinuteInDateTime
            }
          )
      }
      if (fromDate < Date.now()) {
        return res.status(400)
          .json(
            {
              success: false,
              message: config.responseMessages.invalidFrom
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
      // validate doctor appointments
      const appointments = await Appointment.find({ doctorId: appointment.doctorId })
      if (appointments.some(x => x.fromDate.getTime() === fromDate.getTime())) {
        return res.status(400)
          .json(
            {
              success: false,
              message: config.responseMessages.invalidAppointmentDate
            }
          )
      }
      appointment.fromDate = fromDate
      appointment.toDate = date.addMinutes(fromDate, 30)
    }
    if (req.body.status) {
      if (!Object.values(config.appointmentStatuses)
        .some(x => x === req.body.status)) {
        return res.status(400)
          .json(
            {
              success: false,
              message: config.responseMessages.invalid_status
            }
          )
      }
      appointment.status = req.body.status
    }
    await appointment.save()
    res.json({ sucess: true, message: config.responseMessages.success })
  } catch (err) {
    res.json({ sucess: true, message: err.message })
  }
}

module.exports.create = create
module.exports.updateOne = updateOne