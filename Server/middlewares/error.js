const config = require('../config.json')
const errorHandler = (callback) => {
  return (req, res, next) =>
    callback(req, res, next)
      .catch((err) => next(err))
}

const errorMiddleware = async(err, _req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  if (Object.values(config.responseMessages)
    .some(x => x === err)) {
    return res.status(400)
      .json({ success: false, message: err })
  }
  if (err.name === config.errorNames.Validation) {
    res.status(400)
      .json({ success: false, message: err.message })
  } else {
    if (err.name === config.errorNames.Mongo && err.code === 11000) {
      return res.status(400)
        .json({ success: false, message: err.message })
    }
    res.status(err.statusCode ?? 500)
      .json({ success: false, message: err.message ?? config.responseMessages.unexpectedErrorOccurred })
  }
}
const notFound = async(_req, res, _next) => {
  res.status(404)
    .json()
}
module.exports = { errorMiddleware, errorHandler, notFound }