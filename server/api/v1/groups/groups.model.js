let mongoose = require('mongoose')
let Schema = mongoose.Schema

let groupSchema = new Schema({
  title: String,
  admins: [String],
  creator: String,
  participants: [String],
  invite: false,
  createtime: { type: Date, default: Date.now }
})

module.exports = mongoose.model('groups', groupSchema)
