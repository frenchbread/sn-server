import express from 'express'
import accountModel from '../models/account'

const router = express.Router()

router.post('/', (req, res) => {
  const data = req.body

  accountModel.add(data)
    .then(accs => res.json(accs))
    .catch(err => res.status(500))
})

router.get('/', (req, res) => {
  accountModel.getAll()
    .then(accs => res.json(accs))
    .catch(err => res.status(500))
})

router.delete('/:_id', (req, res) => {
  const _id = req.params._id

  if (_id) {
    accountModel.remove({ _id })
      .then(data => res.json(data))
      .catch(() => res.status(500))
  }
})

module.exports = router
