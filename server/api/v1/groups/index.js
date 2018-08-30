const express = require('express')

const router = express.Router()
const validate = require('express-jsonschema').validate

const validationSchema = require('./validationSchema')
const controller = require('./groups.controller')
const invite = require('./invite.controller')
const admin = require('./admin.controller')

router.get('/', controller.index)
router.post('/',
  validate({body: validationSchema.createGroupPayload}),
  controller.createGroup)

// Handling Invite Logic
router.get('/:groupId/invite', invite.createInvite)
router.delete('/:groupId/invite', invite.deleteInvite)

// Handling Admin Logic
router.patch('/:groupId/admins', admin.addAdmin)
router.delete('/:groupId/admins', admin.deleteAdmin)

module.exports = router
