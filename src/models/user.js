import jwt from 'jsonwebtoken'

import User from '../schemas/user'
import config from '../config'

export default {
  register (email, password) {
    return new Promise((resolve, reject) => {
      if (email && password) {
        const newUser = new User({
          email,
          password
        })

        // Attempt to save the user
        newUser.save((err, user) => {
          if (err) {
            reject({
              ok: false,
              message: 'That email address already exists.'
            })
          }

          resolve({
            ok: true,
            message: 'Successfully created new user.'
          })
        })
      } else {
        reject({
          ok: false,
          message: 'Please enter email and password.'
        })
      }
    })
  },
  authenticate (email, password) {
    return new Promise((resolve, reject) => {
      User.findOne({
        email
      }, (err, user) => {
        if (err) {
          reject({
            ok: false,
            message: 'Authentication failed.'
          })
        }

        if (user) {
          // Check if password matches
          user.comparePassword(password, (err1, isMatch) => {
            if (isMatch && !err1) {
              // Create token if the password matched and no error was thrown
              const token = jwt.sign(user, config.auth.secret, {
                expiresIn: '2 days'
              })
              resolve({
                ok: true,
                message: 'Authentication successfull',
                user: {
                  _id: user._id,
                  email: user.email
                },
                token
              })
            } else {
              reject({
                ok: false,
                message: 'Authentication failed. Passwords did not match.'
              })
            }
          })
        } else {
          reject({
            ok: false,
            message: 'Authentication failed. User not found.'
          })
        }
      })
    })
  },
  get () {
    return new Promise((resolve, reject) => {
      User.find({}, { password: 0 }, (err, users) => {
        if (err) reject(err)
        resolve(users)
      })
    })
  },
  me (user) {
    return {
      ok: true,
      user: {
        _id: user._id,
        email: user.email
      },
      message: 'Token verified successfully.'
    }
  }
}
