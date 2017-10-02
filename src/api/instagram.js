import ig from '../lib/instagram'

import config from '../config'

export default {
  getUserIdByUsername (username) {
    return new Promise((resolve, reject) => {
      ig.user_search(username, {}, (err, users, remaining, limit) => {
        if (err) reject(err)

        if (users.length > 0) {
          resolve(users[0].id)
        } else {
          reject('nothing found')
        }
      })
    })
  },
  getMediasForUser (userId) {
    return new Promise((resolve, reject) => {
      ig.user_media_recent(userId, {}, (err, medias, pagination, remaining, limit) => {
        if (err) reject(err)

        resolve(medias)
      })
    })
  }
}
