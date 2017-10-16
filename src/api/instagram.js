import axios from 'axios'

export default {
  getUserMedia (username) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.instagram.com/${username}/?__a=1`)
        .then(res => {
          if (res.data && res.data.user) {
            resolve(res.data.user)
          } else {
            reject('This user does not exist')
          }
        })
        .catch(err => reject(err))
    })
  }
}
