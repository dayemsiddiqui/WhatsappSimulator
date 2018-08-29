const logger = require('./../../../components/logger')
const Contacts = require('./contacts.model')
const TAG = '/server/api/v1/groups/groups.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the index endpoint')
  if (req.body.blocking) {
    // It means we need to handel it async
    // Not supported in simulator
  } else {
    // we need to handel syncronously
    Contacts.find({'phone': {$in: req.body.contacts}})
      .select({'phone': 1})
      .exec()
      .then((contacts) => {
        let resp = []
        let flag = false

        req.body.contacts.forEach(reqContact => {
          contacts.some(dbContact => {
            if (reqContact === dbContact.phone) {
              resp.push({'input': reqContact, 'status': 'valid', 'wa_id': dbContact._id})
              flag = true
              return true
            }
          })
          if (!flag) {
            resp.push({'input': reqContact, 'status': 'invalid'})
          }

          flag = false
        })

        res.status(200).json({ contacts: resp })
      })
      .catch(err => {
        logger.serverLog(TAG, `Inernal Server Error ${JSON.stringify(err)}`)
        res.status(500).json({ status: 'failed', payload: err })
      })
  }
  // res.status(200).json({ status: 'success', payload: 'Hello Contact' })
}

exports.create = function (req, res) {
  logger.serverLog(TAG, 'Hit the create endpoint')
  let payload = new Contacts({
    name: req.body.name ? req.body.name : 'user',
    phone: req.body.phone
  })

  payload.save(err => {
    err
      ? res.status(500).json({ status: 'failed', payload: err })
      : res.status(201).json({ status: 'success', payload: 'Contact Saved' })
  })
}
