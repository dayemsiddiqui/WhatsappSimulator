const logger = require('./../../../components/logger')
const Groups = require('./groups.model')

const TAG = '/server/api/v1/groups/groups.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve all groups')
  Groups.find({})
    .exec()
    .then(result => {
      let resp = []
      result.forEach(oneGroup => {
        resp.push({id: oneGroup._id})
      })
      res.status(200).json({ groups: resp })
    })
    .catch(err => {
      logger.serverLog(TAG, `Inernal Server Error ${JSON.stringify(err)}`)
      res.status(500).json({ status: 'failed', err: err })
    })
}

exports.createGroup = function (req, res) {
  logger.serverLog(TAG, 'Hit the endpoint for Create Group')
  let group = {
    title: req.body.subject
  }

  Groups.create(group)
    .then(result => {
      let resp = []
      resp.push({creation_time: result.createtime, id: result._id})
      res.status(201).json({ groups: resp })
    })
    .catch(err => {
      logger.serverLog(TAG, `Inernal Server Error ${JSON.stringify(err)}`)
      res.status(500).json({ status: 'failed', payload: err })
    })
}
