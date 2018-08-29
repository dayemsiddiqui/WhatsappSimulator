const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./contacts.controller')

router.post('/',
  validate({body: validationSchema.requestPayload}),
  controller.index)

router.post('/create',
  validate({body: validationSchema.contactPayload}),
  controller.create)

module.exports = router
