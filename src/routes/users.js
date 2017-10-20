import express from 'express'
import passport from 'passport'

import userModel from '../models/user'

const router = express.Router()

router.post('/register', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  userModel.register(email, password)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

router.post('/auth', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  userModel.authenticate(email, password)
    .then(auth => res.json(auth))
    .catch(err => res.json(err))
})

// router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   userModel.get()
//     .then(users => res.json(users))
//     .catch(() => res.status(500))
// })

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(userModel.me(req.user))
})

module.exports = router
