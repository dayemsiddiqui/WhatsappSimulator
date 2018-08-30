const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const config = require('./../../../config/environment/index')
const TAG = '/server/api/v1/groups/invite.controller.js'

exports.createInvite = function (req, res) {
  const groupId = req.params.groupId
  logger.serverLog(TAG, `Create Invite for Groups ${groupId}`)
  Groups.findOne({_id: groupId})
    .exec()
    .then(group => {
      group.invite = true

      group.save(function (err) {
        if (err) {
          logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
          return res.status(500).json({ status: 'failed', err: err })
        }
        return res.status(200).json({
          groups: [{
            link: `http://${config.domain}:${config.port}/v1/invites/groups/${group._id}`
          }]
        }
        )
      })
    })
    .catch(err => {
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', err: err })
    })
}

exports.deleteInvite = function (req, res) {
  const groupId = req.params.groupId
  logger.serverLog(TAG, `Delete Invite for Groups ${groupId}`)
  Groups.findOne({_id: groupId})
    .exec()
    .then(group => {
      group.invite = false

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
