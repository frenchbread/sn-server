import axios from 'axios'
import accountModel from '../models/account'

export default {
  getUserMedia (username) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.instagram.com/${username}/?__a=1`)
        .then(res => {
          if (res.data && res.data.user) {
            resolve(res.data.user)
          } else {
            console.error('instagram:err: This user does not exist')
            accountModel.update({ username }, { needsManualCheck: true })
              .then(res => console.log(`${username} was flagged as acc that needs manual checking.`))
              .catch(err => console.error(err.message))
          }
        })
        .catch(err => {
          if (err.response.status === 404) {
            accountModel.update({ username }, { needsManualCheck: true })
              .then(res => console.log(`${username} was flagged as acc that needs manual checking.`))
              .catch(err => console.error(err.message))
          } else {
            console.error('instagram:err: ' + err.message)
          }
        })
    })
  }
}
