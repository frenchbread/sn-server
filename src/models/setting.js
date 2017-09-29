import Setting from '../schema/setting'

export default {
  add (token) {
    const setting = new Setting({ instagram_token: token })

    return new Promise((resolve, reject) => {
      setting.save((err, res) => {
        if (err) reject(err)

        resolve(res)
      })
    })
  },
  update () {

  },
  get () {
    return new Promise((resolve, reject) => {
      Setting.findOne({}, (err, res) => {
        if (err) reject(err)

        resolve(res)
      })
    })
  }
}
