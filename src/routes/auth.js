import express from 'express'

import ig from '../lib/instagram'

const router = express.Router()

const redirect_uri = 'https://gttdn.io:3031/auth/handleauth/instagram'

router.get('/authorize_user/instagram', (req, res) => {
  res.redirect(
    ig.get_authorization_url(redirect_uri, {
      scope: ['public_content']
    })
  )
})

router.get('/handleauth/instagram', (req, res) => {
  ig.authorize_user(req.query.code, redirect_uri, (err, result) => {
    if (err) {
      res.json({ ok: false })
    } else {
      console.log('Yay! Access token is ' + result.access_token)
      ig.use({ access_token: result.access_token })
      res.send({ ok: true })
    }
  })
})

module.exports = router
