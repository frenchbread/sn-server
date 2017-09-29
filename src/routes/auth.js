import express from 'express'

import ig from '../lib/instagram'
import settingModel from '../models/setting'

const router = express.Router()

const redirect_uri = 'https://gttdn.io:3031/auth/handleauth/instagram'
// const redirect_uri = 'http://127.0.0.1:8080/auth/handleauth/instagram'

router.get('/authorize_user/instagram', (req, res) => {

  settingModel.get()
    .then(setting => {
      if (setting && setting.instagram_token) {
        res.json({ ok: true, err: 'token exists' })
        // Check & apply current token
      } else {
        const url = ig.get_authorization_url(redirect_uri, { scope: ['public_content'] })
        // Get token here
        res.redirect(url)
      }
    })
    .catch(err => res.json({ ok: false, err }))
})

router.get('/handleauth/instagram', (req, res) => {
  ig.authorize_user(req.query.code, redirect_uri, (err, result) => {
    if (err) {
      console.log(err)
      res.json({ ok: false })
    } else {
      console.log('Yay! Access token is ' + result.access_token)
      res.json({ ok: true })
      // ig.use({ access_token: result.access_token })
      // settingModel.add(result.access_token)
      //   .then(res => res.json({ ok: true, setting }))
      //   .catch(err => res.json({ ok: false, err }))
    }
  })
})

module.exports = router
