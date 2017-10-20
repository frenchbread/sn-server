import express from 'express'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'

import cron from './cron'
import config from './config'

mongoose.connect(config.env === 'development' ? config.database.local : config.database.prod)

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(favicon('./public/favicon.png'))
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('./public'))
app.use('/bower_components', express.static('./bower_components'))
app.use(session({
  secret: 'abc',
  resave: true,
  saveUninitialized: true
}))
app.use(cors())
app.use(passport.initialize())
require('./lib/passport')(passport)

app.use('/', require('./routes'))
app.use('/accounts', require('./routes/account'))
app.use('/users', require('./routes/users'))
app.use('/settings', require('./routes/settings'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

export default app

// cron jobs
cron.start()
