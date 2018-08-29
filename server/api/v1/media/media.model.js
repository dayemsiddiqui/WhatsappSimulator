let mongoose = require('mongoose')
let Schema = mongoose.Schema

let mediaSchema = new Schema({
    mediaId: String, 
    contactId: { type: Schema.ObjectId, ref: 'contacts' }, 
    groupId: { type: Schema.ObjectId, ref: 'groups' }, 
    mediaType: String,
})

module.exports = mongoose.model('media', mediaSchema)
