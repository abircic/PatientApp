const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema(
  {
    appointment: { type: mongoose.Types.ObjectId },
    username: { type: String, required: true, immutable: true },
    createdDate: { type: Date, required: true },
    key: { type: String, required: true }
  }
)

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification