import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/auth/instagram', passport.authenticate('instagram'));

router.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router
