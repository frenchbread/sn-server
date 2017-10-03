import VKApi from 'node-vkapi'

import config from '../config'

const VK = new VKApi(config.vk)

export default {
  getLastPost (domain) {
    return new Promise((resolve, reject) => {
      VK.auth.user({ scope: ['wall'] })
        .then(token => {
          VK.call('wall.get', { domain })
            .then(res => resolve(res.items[0]))
            .catch(err => reject(err))
        })
        .catch(error => reject(err))
    })
  }
}
