import mongoose from 'mongoose'

const SettingSchema = mongoose.Schema({
  instagram_token: {
    type: String
  }
})

module.exports = mongoose.model('Setting', SettingSchema)
