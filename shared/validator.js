const Joi = require('joi')
const config = require('../config.json')
const validateRequest = (request, schema, allowUnknown = true) => {
  if (schema === registerRequestValidationSchema) {
    if (!config.userRoles.some(x => x.id === request.type)) { return config.responseMessages.invalidTypeMessage }
  }
  const result = schema.validate(request, { abortEarly: false, allowUnknown: allowUnknown })
  if (result.error) {
    return result.error.details.map(x => x.message)
      .join(',')
  }
  return null
}

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

  type: Joi.number()
    .required()
    .valid(1, 2)
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

const updatePasswordRequestValidationSchema = Joi.object({
  username: Joi.string()
    .email()
    .required(),

  oldPassword: Joi.string()
    .min(8)
    .max(50)
    .required(),

  newPassword: Joi.string()
    .min(8)
    .max(50)
    .required()
})

const usersFilterValidationSchema = Joi.object({
  type: Joi.string()
    .valid('1', '2'),

  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(50),

  lastName: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
})

const createAppointmentValidationSchema = Joi.object({
  doctorId: Joi.string()
    .required(),

  patientId: Joi.string()
    .required(),

  fromDate: Joi.date()
    .required(),

  toDate: Joi.date()
    .required()
})
const validateCreateAppointmentRequest = req => validateRequest(req, createAppointmentValidationSchema)
const validateRegisterRequest = req => validateRequest(req, registerRequestValidationSchema)
const validateLoginRequest = req => validateRequest(req, loginRequestValidationSchema)
const validateUsersFilterRequest = req => validateRequest(req, usersFilterValidationSchema, false)
const validateUpdatePasswordRequest = req => validateRequest(req, updatePasswordRequestValidationSchema)
module.exports.validateRegisterRequest = validateRegisterRequest
module.exports.validateLoginRequest = validateLoginRequest
module.exports.validateUsersFilterRequest = validateUsersFilterRequest
module.exports.validateUpdatePasswordRequest = validateUpdatePasswordRequest
module.exports.validateCreateAppointmentRequest = validateCreateAppointmentRequest