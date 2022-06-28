const Appointment = require('../models/domain/Appointment')
const User = require('../models/domain/User')
const config = require('../config.json')
const { validateCreateAppointmentRequest } = require('../shared/validator')
const date = require('date-and-time')
const { ValidationError } = require('../shared/error')

const create = async(req, res, next) => {
  // validate request
  const result = validateCreateAppointmentRequest(req.body)
  if (result) {
    throw new ValidationError(result)
  }
  const { fromDate, doctorId, patientId } = req.body
  const validationResult = await validateDateTime(new Date(fromDate))
  if (validationResult) {
    throw new ValidationError(validationResult)
  }
  const validateUsersResult = await validateUsers(patientId, doctorId)
  if (validateUsersResult.message) {
    throw new ValidationError(validateUsersResult.message)
  }
  const newFromDate = new Date(fromDate)
  newFromDate.setSeconds(0, 0)

  const appointmentModel = await validateAndSaveAppointment(newFromDate, validateUsersResult.patientModel, validateUsersResult.doctorModel)
  if (appointmentModel.message) {
    throw new ValidationError(appointmentModel.message)
  }
  res.status(200)
    .json({ success: true, message: config.responseMessages.success, appointmentId: appointmentModel.appointment._id })
}

const updateOne = async(req, res) => {
  const appointment = await Appointment.findById({ _id: req.body.id })
  if (!appointment) {
    throw new ValidationError(config.responseMessages.invalidAppoitnment)
  }
  // validate date time
  if (req.body.fromDate) {
    const fromDate = new Date(req.body.fromDate)
    fromDate.setSeconds(0, 0)
    const validationResult = await validateDateTime(new Date(req.body.fromDate))
    if (validationResult) {
      throw new ValidationError(validationResult)
    }
    // validate doctor appointments
    const appointments = await Appointment.find({ doctorId: appointment.doctorId })
    if (appointments.some(x => x.fromDate.getTime() === fromDate.getTime())) {
      throw new ValidationError(config.responseMessages.invalidAppointmentDate)
    }
    appointment.fromDate = fromDate
    appointment.toDate = date.addMinutes(fromDate, 30)
  }
  if (req.body.status) {
    if (!Object.values(config.appointmentStatuses)
      .some(x => x === req.body.status)) {
      throw new ValidationError(config.responseMessages.invalidStatus)
    }
    appointment.status = req.body.status
  }
  await appointment.save()
  res.json({ success: true, message: config.responseMessages.success, appointmentId: appointment._id })
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

const validateUsers = async(patientId, doctorId) => {

  // validate patient
  const patientModel = await User.findById({ _id: patientId })// todo id from JWT
  if (!patientModel) {
    return { message: 'invalid_patient_id' }
  }

  // validate doctor
  const doctorModel = await User.findById({ _id: doctorId })
  if (!doctorModel) {
    return { message: config.responseMessages.invalidDoctorId }
  }
  return { patientModel: patientModel, doctorModel: doctorModel }
}

const validateAndSaveAppointment = async(fromDate, patientModel, doctorModel) => {
  // validate doctor appointments
  const appointments = await Appointment.find({ doctorId: doctorModel._id })
  if (appointments.some(x => x.fromDate.getTime() === fromDate.getTime())) {
    return { message: config.responseMessages.invalidAppointmentDate }
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
  return { appointment: appointment }
}

const fetchByUserId = async(req, res) => {
  const { id, type } = req.query
  if (type === '1') {
    const appointment = await (await Appointment.find({ doctor: id })
      .populate('patient')
      .exec()).map(x => {
      return {
        fromDate: x.fromDate,
        toDate: x.toDate,
        patient: x.patient.username
      }
    })
    return res.json({ success: true, appointments: appointment })
  } else if (type === '2') {
    const appointment = await Appointment.find({ patient: id })
    return res.json({ success: true, appointments: appointment })
  } else {
    return res.status(400)
      .json({ success: false, message: config.responseMessages.invalidStatus })
  }
}
module.exports = { create, updateOne, fetchByUserId }