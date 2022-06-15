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
    const validationResult = await validateDateTime(new Date(req.body.fromDate))
    if (validationResult) {
      return res.status(400)
        .json(
          {
            success: false,
            message: validationResult
          })
    }
    const validateUsersResult = await validateUsers(req.body.patientId, req.body.doctorId)
    if (validateUsersResult.message) {
      return res.status(400)
        .json(
          {
            success: false,
            message: validateUsersResult.message
          })
    }

    const fromDate = new Date(req.body.fromDate)
    fromDate.setSeconds(0, 0)

    const appointment = await validateAndSaveAppointment(fromDate, validateUsersResult.patientModel, validateUsersResult.doctorModel)
    if (appointment) {
      return res.status(400)
        .json({ success: false, message: appointment })
    }
    return res.status(200)
      .json({ success: true, message: config.responseMessages.success })
  } catch (err) {
    res.json({ sucess: true, message: err.message })
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
      const fromDate = new Date(req.body.fromDate)
      fromDate.setSeconds(0, 0)
      const validationResult = await validateDateTime(new Date(req.body.fromDate))
      if (validationResult) {
        return res.status(400)
          .json(
            {
              success: false,
              message: validationResult
            })
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
              message: config.responseMessages.invalidStatus
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
const validateDateTime = async(fromDate) => {

  const dateNow = new Date(Date.now())
  const onePlusDay = date.addDays(dateNow, 1)
  if (onePlusDay > fromDate) { return config.responseMessages.invalidAppointmentDateToday }

  // validate minute
  if (fromDate.getMinutes() !== 30 && fromDate.getMinutes() !== 0) {
    return config.responseMessages.invalidMinuteInDateTime
  }

  // validate date time
  if (fromDate < Date.now()) {
    return config.responseMessages.invalidFrom
  }

  // validate day of week
  const isValidDate = Object.values(config.allowedDays)
    .some(x => x === new Date(fromDate)
      .getDay())
  if (!isValidDate) {
    return config.responseMessages.invalidDayOfWeek
  }
}

const validateUsers = async(patient, doctor) => {

  // validate patient
  const patientModel = await User.findById({ _id: patient })// todo id from JWT
  if (!patientModel) {
    return { message: 'invalid_patient_id' }
  }

  // validate doctor
  const doctorModel = await User.findById({ _id: doctor })
  if (!doctorModel) {
    return { message: config.responseMessages.invalidDoctorId }
  }
  return { patientModel: patientModel, doctorModel: doctorModel }
}

const validateAndSaveAppointment = async(fromDate, patientModel, doctorModel) => {
  // validate doctor appointments
  const appointments = await Appointment.find({ doctorId: doctorModel._id })
  if (appointments.some(x => x.fromDate.getTime() === fromDate.getTime())) {
    return config.responseMessages.invalidAppointmentDate
  }
  const appointment = new Appointment(
    {
      createdDate: Date.now(),
      fromDate: fromDate,
      toDate: date.addMinutes(fromDate, 30),
      patient: patientModel,
      doctor: doctorModel,
      status: config.appointmentStatuses.Scheduled
    }
  )
  await appointment.save()
}
module.exports.create = create
module.exports.updateOne = updateOne