let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  username: String, 
  phone: String, 
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date }
})

module.exports = mongoose.model('users', userSchema)
