let mongoose = require('mongoose')
let Schema = mongoose.Schema

let contactSchema = new Schema({
  name: String,
  phone: String,
  isActive: String,
  isSubscribed: String,
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date }
})

module.exports = mongoose.model('contacts', contactSchema)
