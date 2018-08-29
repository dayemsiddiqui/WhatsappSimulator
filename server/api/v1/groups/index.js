const express = require('express')

const router = express.Router()
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./groups.controller')

router.get('/', controller.index)
router.post('/',
  validate({body: validationSchema.createGroupPayload}),
  controller.createGroup)

module.exports = router
