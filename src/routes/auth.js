import express from 'express'

import ig from '../lib/instagram'
import settingModel from '../models/setting'

const router = express.Router()

const redirect_uri = 'https://gttdn.io:3031/auth/handleauth/instagram'

router.get('/authorize_user/instagram', (req, res) => {

  settingModel.get()
    .then(setting => {
      if (setting && setting.instagram_token) {
        ig.use({ access_token: setting.instagram_token })
        res.json({ ok: true })
        // Check & apply current token
        // ig.user_search('frbrr', function(err, users, remaining, limit) {
        //   console.log(err, users)
        // });
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
      res.json({ ok: false, err })
    } else {
      res.json({ ok: true })
      // ig.use({ access_token: result.access_token })
      // settingModel.add(result.access_token)
      //   .then(res => res.json({ ok: true, setting }))
      //   .catch(err => res.json({ ok: false, err }))
    }
  })
})

module.exports = router
