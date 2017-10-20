import express from 'express'
import passport from 'passport'

import settingsModel from '../models/settings'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const data = req.body

  data.createdBy = req.user._id

  settingsModel.add(data)
    .then(settings => res.json(settings))
    .catch(err => res.status(500))
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const createdBy = req.user._id

  settingsModel.getOne({ createdBy })
    .then(settings => res.json(settings))
    .catch(err => res.status(500))
})

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const createdBy = req.user._id
  const data = req.body

  settingsModel.update({ createdBy }, data)
    .then(settings => res.json(settings))
    .catch(() => res.status(500))
})

module.exports = router
