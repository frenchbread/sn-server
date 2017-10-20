import Account from '../schemas/account'

export default {
  add (data) {
    const acc = new Account(data)

    return new Promise((resolve, reject) => {
      acc.save((err, res) => {
        if (err) reject(err)

        this.getOne({ _id: res._id })
          .then(acc1 => resolve(acc1))
          .catch(err1 => reject(err1))
      })
    })
  },
  getOne (q) {
    return new Promise((resolve, reject) => {
      Account
        .findOne(q)
        .populate('createdBy', 'email _id')
        .exec((err, res) => {
          if (err) reject(err)
          resolve(res)
        })
    })
  },
  getAll () {
    return new Promise((resolve, reject) => {
      Account
        .find({})
        .populate('createdBy', 'email _id')
        .exec((err, res) => {
          if (err) reject(err)
          resolve(res)
        })
    })
  },
  updateOffset (_id, offset) {
    return new Promise((resolve, reject) => {
      Account
        .update({ _id }, { offset })
        .exec((err, res) => {
          if (err) reject(err)
          resolve(res)
        })
    })
  },
  remove (q) {
    return new Promise((resolve, reject) => {
      Account
        .remove(q, (err, res) => {
          if (err) reject(err)
          resolve(res)
        })
    })
  }
}
