import mongoose from 'mongoose'

const AccountSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['twitter', 'instagram', 'vk'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  offset: {
    type: String
  }
})

module.exports = mongoose.model('Account', AccountSchema)
