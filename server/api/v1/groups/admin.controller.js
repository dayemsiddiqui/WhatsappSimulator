const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const TAG = '/server/api/v1/groups/invite.controller.js'
const _ = require('lodash')

exports.addAdmin = function (req, res) {
  if (!req.body.wa_ids || !Array.isArray(req.body.wa_ids)) {
    return res.status(500).json({status: 'failed', err: 'Invalid Body Payload'})
  }

  const groupId = req.params.groupId
  const newAdmins = req.body.wa_ids
  logger.serverLog(TAG, `Add Admins to Group ${groupId}`)

  Groups.findOne({_id: groupId})
    .exec()
    .then(group => {
      newAdmins.map((admin) => {
        group.admins.push(admin)
      })

      group.save(function (err) {
        if (err) {
          logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
          return res.status(500).json({ status: 'failed', err: err })
        }
        return res.status(200).json({})
      })
    })
    .catch(err => {
      if (Object.keys(err).length === 0) {
        logger.serverLog(TAG, `Group not found`)
        return res.status(404).json({})
      }
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', err: err })
    })
}

exports.deleteAdmin = function (req, res) {
  if (!req.body.wa_ids || !Array.isArray(req.body.wa_ids)) {
    return res.status(500).json({status: 'failed', err: 'Invalid Body Payload'})
  }

  const groupId = req.params.groupId
  const newAdmins = req.body.wa_ids
  logger.serverLog(TAG, `Delete Admins of Group ${groupId}`)

  Groups.findOne({_id: groupId})
    .exec()
    .then(group => {
      group.admins = _.difference(_.union(group.admins, newAdmins), _.intersection(group.admins, newAdmins))

      group.save(function (err) {
        if (err) {
          logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
          return res.status(500).json({ status: 'failed', err: err })
        }
        return res.status(200).json({})
      })
    })
    .catch(err => {
      if (Object.keys(err).length === 0) {
        logger.serverLog(TAG, `Group not found`)
        return res.status(404).json({})
      }
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', err: err })
    })
}
