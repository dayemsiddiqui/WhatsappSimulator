const path = require('path')
const config = require('./config/environment/index')

module.exports = function (app) {
  const env = app.get('env')

  // API middlewares go here
  app.use('/api/v1/test', require('./api/v1/test'))

  // auth middleware go here

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })
}
