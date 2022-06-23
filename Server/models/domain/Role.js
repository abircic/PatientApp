const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, unique: true }
  }
)

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role