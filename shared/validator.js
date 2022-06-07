const Joi = require('joi')

const validateRequest = (request, schema, allowUnknown = true) => {
  const result = schema.validate(request, { abortEarly: false, allowUnknown: allowUnknown })
  if (result.error) {
    return result.error.details.map(x => x.message)
      .join(',')
  }
  return null
}

/* User Controller */
const registerRequestValidationSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
    .required(),

  lastName: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
    .required(),

  username: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(50)
    .required(),

  type: Joi.string()
    .required()
    .valid('Patient', 'Doctor')
})

const loginRequestValidationSchema = Joi.object({
  username: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(50)
    .required()
})

const usersFilterValidationSchema = Joi.object({
  type: Joi.string()
    .valid('Patient', 'Doctor'),

  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(50),

  lastName: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
})

const validateRegisterRequest = req => validateRequest(req, registerRequestValidationSchema)
const validateLoginRequest = req => validateRequest(req, loginRequestValidationSchema)
const validateUsersFilterRequest = req => validateRequest(req, usersFilterValidationSchema, false)

module.exports.validateRegisterRequest = validateRegisterRequest
module.exports.validateLoginRequest = validateLoginRequest
module.exports.validateUsersFilterRequest = validateUsersFilterRequest