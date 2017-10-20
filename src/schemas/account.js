import mongoose from 'mongoose'

const AccountSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['twitter', 'instagram', 'vk', 'youtube'],
    required: true
  },
  name: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  helper_id: {
    type: String
  },
  offset: {
    type: String
  },
  createdBy: {
    type: String,
    ref: 'User'
  }
})

module.exports = mongoose.model('Account', AccountSchema)
