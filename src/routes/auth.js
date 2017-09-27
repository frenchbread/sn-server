import express from 'express'

import ig from '../lib/instagram'

const router = express.Router()

const redirect_uri = 'https://gttdn.io:3031/auth/handleauth/instagram'

const authorize_user = (req, res) => {
  res.redirect(
    ig.get_authorization_url(redirect_uri, {
      scope: ['public_content']
    })
  );
}

const handleauth = (req, res) => {
  ig.authorize_user(req.query.code, redirect_uri, (err, result) => {
    if (err) {
      res.send("Didn't work")
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!')
    }
  });
};

router.get('/authorize_user/instagram', authorize_user)

router.get('/handleauth/instagram', handleauth)

module.exports = router
