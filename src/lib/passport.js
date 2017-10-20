const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../schemas/user')
const config = require('../config/').default

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.auth.secret
  }

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({
      _id: jwt_payload._doc._id
    }, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
