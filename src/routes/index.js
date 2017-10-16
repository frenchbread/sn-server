import express from 'express'
import intexModel from '../models'

const router = express.Router()

// home
router.get('/', (req, res) => {
  res.json(intexModel())
})

module.exports = router
