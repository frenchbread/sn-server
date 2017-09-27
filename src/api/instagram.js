import instagramApi from 'instagram-node'

import config from '../config'

const ig = instagramApi.instagram()

ig.use(config.instagram)

export default {
  getForUser () {
    // ig.user_search('frbrr', {}, function(err, users, remaining, limit) {
    //   if (err) console.error(err)
    //
    //   console.log(users)
    // });
  }
}
