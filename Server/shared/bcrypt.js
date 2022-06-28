const bcrypt = require('bcrypt')
const Role = require('../models/domain/Role')
const config = require('../config.json')

exports.cryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

exports.comparePassword = async(plainPass, hashword) => await bcrypt.compare(plainPass, hashword)

exports.rolesMigration = async() => {
  try {
    const allRoles = config.userRoles
    const savedRoles = await Role.find()
    const rolesToInsert = allRoles.filter(x => !savedRoles.some(y => x.id == y.id))
      .map(x => new Role(x))

    await Role.bulkSave(rolesToInsert)

  } catch (err) {
    console.log(err)
  }
}