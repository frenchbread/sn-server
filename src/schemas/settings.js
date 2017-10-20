import mongoose from 'mongoose'

const SettingsSchema = mongoose.Schema({
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
