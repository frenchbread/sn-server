import Settings from '../schemas/settings'

export default {
  add (data) {
    const settings = new Settings(data)

    return new Promise((resolve, reject) => {
      settings.save((err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  },
  update (q, data) {
    const settingsData = data

    return new Promise((resolve, reject) => {
      Settings
        .update(q, settingsData)
        .exec((err, res) => {
          if (err) reject(err)

          if (res.ok === 1) {
            // Additional fetch is needed to pre-populate data
            this.getOne(q)
              .then(event => resolve(event))
              .catch(err1 => reject(err1))
          }
        })
    })
  },
  getOne (q) {
   return new Promise((resolve, reject) => {
     Settings
       .findOne(q)
       .populate('createdBy', 'email _id')
       .exec((err, res) => {
         if (err) reject(err)
         resolve(res)
       })
   })
  }
}
