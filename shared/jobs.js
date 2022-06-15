const Appointment = require('../models/domain/Appointment')
const Notification = require('../models/domain/Notification')
const User = require('../models/domain/User')
const config = require('../config.json')
const date = require('date-and-time')
const { sendMail } = require('../shared/mail')

exports.getAppointments = async() => {
  const dateNow = new Date(Date.now())
  const onePlusDay = date.addDays(dateNow, 1)
  const appointments = await Appointment.aggregate([
    {
      $lookup: {
        from: 'notifications',
        localField: '_id',
        foreignField: 'appointment',
        as: 'sent_notifications'
      }
    },
    {
      $match:
      {
        sent_notifications: { $size: 0 },
        status: { $in: [config.appointmentStatuses.Scheduled, config.appointmentStatuses.Rescheduled] },
        fromDate: { $gte: dateNow, $lte: onePlusDay }
      }
    }
  ])
  await User.populate(appointments, [{ path: 'patient' }, { path: 'doctor' }])
  if (appointments.length > 0) {
    for (const app of appointments) {
      try {
        await sendMail(app)
        await saveNotification(app)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const saveNotification = async(appointment) => {
  console.log(appointment)
  const notification = new Notification(
    {
      appointment: appointment,
      username: appointment.patient.username,
      createdDate: Date.now()
    }
  )
  await notification.save()
}