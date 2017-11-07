import mongoose from 'mongoose'

const SettingsSchema = mongoose.Schema({
  admin: {
    type: String
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  vk: {
    type: String
  },
  youtube: {
    type: String
  },
  createdBy: {
    type: String,
    ref: 'User'
  }
})

module.exports = mongoose.model('Settings', SettingsSchema)
