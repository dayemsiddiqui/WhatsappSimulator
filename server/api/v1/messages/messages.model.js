let mongoose = require('mongoose')
let Schema = mongoose.Schema

let messageSchema = new Schema({ 
  recepientType: String,
  to: String,
  type: String,
  messageBody:  Schema.Types.Mixed,
})

module.exports = mongoose.model('messages', messageSchema)
