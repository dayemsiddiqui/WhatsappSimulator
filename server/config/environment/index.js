const path = require('path')
const _ = require('lodash')

const all = {
  env: process.env.NODE_ENV,

  secrets: {
    session: process.env.SESSION_SECRET || 'some string'
  },

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  // Server port
  port: process.env.PORT || 9090,

  ip: process.env.IP || undefined,

  domain: `${process.env.DOMAIN || 'localhost'}`,

  // Mongo Options
  mongo: {
    options: {
      useNewUrlParser: true
    }
  }
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
