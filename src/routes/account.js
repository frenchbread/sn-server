import express from 'express'
import passport from 'passport'

import accountModel from '../models/account'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const data = req.body

  data.createdBy = req.user._id

  accountModel.add(data)
    .then(accs => res.json(accs))
    .catch(err => res.status(500))
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const createdBy = req.user._id

  accountModel.getAll({ createdBy })
    .then(accs => res.json(accs))
    .catch(err => res.status(500))
})

router.delete('/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const _id = req.params._id
  const createdBy = req.user._id

  if (_id) {
    accountModel.remove({ _id, createdBy })
      .then(data => res.json(data))
      .catch(() => res.status(500))
  }
})

module.exports = router
