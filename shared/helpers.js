const bcrypt = require('bcrypt')

exports.cryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

exports.comparePassword = async(plainPass, hashword) => await bcrypt.compare(plainPass, hashword)