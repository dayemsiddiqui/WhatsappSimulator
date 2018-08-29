const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const utility = require('./../../../components/utility')

const TAG = '/server/api/v1/groups/groups.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve all groups')
  Groups.find({}, (err, groups) => {
    if (err) {
      return logger.serverLog(TAG, `Internal Server error at Index: ${JSON.stringify(err)}`)
    }

    // Using the utility method to fetch from whatsapp docker
    utility.getFromWhatsapp('/v1/groups/', (err, wgroups) => {
      if (err) {
        return logger.serverLog(TAG, `Error from Whatsapp docker: ${JSON.stringify(err)}`)
      }

      res.status(200).json({ status: 'success', payload: groups })
      // TODO: We need to compare the ids of wgroups and groups and add those not in groups to DB
      // We can fetch detailed information of a group by passing group id to id endpoint
    })
  })
}

exports.GetGroupInformation = function (req, res) {
  logger.serverLog(TAG, 'Hit the information of particular group')
  Groups.findOne({groupId: req.body.groupId}, (err, group) => {
    if (err) {
      return logger.serverLog(TAG, `Internal Server error at GetGroupInformation: ${JSON.stringify(err)}`)
    }

    if (group) {
      // It means we have found the details in our db
      res.status(200).json({ status: 'success', payload: group })
    } else {
      // We don't have details in our db. We need to fetch from Whatsapp docker.
      utility.getFromWhatsapp('/v1/groups/' + req.body.groupId, (err, wgroup) => {
        if (err) {
          return logger.serverLog(TAG, `Error from Whatsapp docker: ${JSON.stringify(err)}`)
        }

        // Save the wgroup in local db
        let payload = {
          title: wgroup.subject,
          admins: wgroup.admins,
          creator: wgroup.creator,
          participants: wgroup.participants,
          createtime: wgroup.creation_time
        }

        Groups.create(payload, (err, result) => {
          if (err) {
            return logger.serverLog(TAG, `Internal Server error ${JSON.stringify(err)}`)
          }

          res.status(200).json({ status: 'success', payload: result })
        })
      })
    }
  })
}

exports.UpdateGroupInformation = function (req, res) {
  logger.serverLog(TAG, 'Hit the information of particular group')
  Groups.findOne({groupdId: req.body.groupId}, (err, group) => {
    if (err) {
      return logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
    }

    // Group found
    if (group) {
      group.title = req.body.title
      let params = {
        'subject': req.body.title
      }
      // update group on whatsapp docker
      utility.putToWhatsapp('/v1/groups/' + req.body.groupId, params, (err, result) => {
        if (err) {
          return logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
        }

        group.save(err => {
          if (err) return logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)

          res.status(200).json({ status: 'success', payload: result })
        })
      })
    } else {
      // group not found
      res.status(404).json({ status: 'success', payload: 'Group was not found' })
    }
  })
}
