const nodemailer = require('nodemailer')

const sendMail = async(appointment, transporter) => {
  try {
    const result = await transporter.sendMail(getMailOptions(appointment))
    console.debug(result)
    if (result.rejected.some(x => x)) {
      console.error(result.response)
    }
    return result.response
  } catch (err) {
    console.error(err)
  }
}

const createTransport = async() => {
  const testAccount = await nodemailer.createTestAccount()
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
}
const getMailOptions = appointment => {
  return {
    from: 'xyz@gmail.com',
    to: appointment.patient.username,
    subject: 'Meeting Reminder',
    html: `<p>You have meeting at: ${appointment.fromDate}</p>`// plain text body
  }
}

module.exports = { createTransport, sendMail }