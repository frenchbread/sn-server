import express from 'express'
import intexModel from '../models'
import apiIG from '../api/instagram'

const router = express.Router()

// home
router.get('/', (req, res) => {
  apiIG.checkForNewMedia()

  res.render('index', intexModel())
})

router.get('/subs', (req, res) => {
  const hub = req.query['hub.challenge']
  console.log(req.query)

  res.send(hub)
})

module.exports = router
