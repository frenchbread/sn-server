import express from 'express'

import ig from '../lib/instagram'
import settingModel from '../models/setting'

const router = express.Router()

const redirect_uri = 'https://gttdn.io:3031/auth/handleauth/instagram'
// const redirect_uri = 'http://127.0.0.1:8080/auth/handleauth/instagram'

router.get('/authorize_user/instagram', (req, res) => {
  res.redirect(
    ig.get_authorization_url(redirect_uri, {
      scope: ['public_content']
    })
  )
})

router.get('/handleauth/instagram', (req, res) => {



  settingModel.get()
    .then(setting => {
      if (!setting) {
        console.log('setting doesnot exist')
        // If token does not exist, request new one & save to db
        // and return with success status
        ig.authorize_user(req.query.code, redirect_uri, (err, result) => {
          if (err) {
            console.log(err)
            res.json({ ok: false })
          } else {
            console.log('Yay! Access token is ' + result.access_token)

            ig.use({ access_token: result.access_token })
            settingModel.add(result.access_token)
              .then(res => res.json({ ok: true, setting }))
              .catch(err => res.json({ ok: false, err }))
          }
        })
      } else {
        console.log('setting exists')
        // If token exists check if it's okay
        // and return with status
        ig.user_self_feed({}, function(err, medias, pagination, remaining, limit) {
          if (err) {
            ig.authorize_user(req.query.code, redirect_uri, (err, result) => {
              if (err) {
                res.json({ ok: false })
              } else {
                console.log('Yay! Access token is ' + result.access_token)

                ig.use({ access_token: result.access_token })
                settingModel.add(result.access_token)
                  .then(res => res.json({ ok: true, setting }))
                  .catch(err => res.json({ ok: false, err }))
              }
            })
          } else {
            ig.use({ access_token: setting.instagram_token })
            res.json({ ok: true, setting })
          }
        })
      }
    })
    .catch(err => res.json({ ok: false, err }))
})

module.exports = router
