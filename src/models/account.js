import Account from '../schema/account'

export default {
  add (data) {
    const acc = new Account(data)

    return new Promise((resolve, reject) => {
      acc.save((err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  },
  getAll () {
    return new Promise((resolve, reject) => {
      Account
        .find()
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
